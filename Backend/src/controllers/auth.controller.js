const jwt  = require('jsonwebtoken');
const User = require('../models/auth.modle');

const IS_PROD    = process.env.NODE_ENV === 'production';
const MAX_ADMINS = 2;

// ── Token helpers ─────────────────────────────────────────────────────────────
const generateTokens = (userId) => ({
  accessToken:  jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET,  { expiresIn: '20d' }),
  refreshToken: jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '365d' }),
});

const cookieBase = () => ({
  httpOnly: true,
  secure:   IS_PROD,
  sameSite: IS_PROD ? 'none' : 'lax',
});

const setTokenCookies = (res, accessToken, refreshToken) => {
  res.cookie('accessToken',  accessToken,  { ...cookieBase(), maxAge: 20 * 24 * 60 * 60 * 1000          });
  res.cookie('refreshToken', refreshToken, { ...cookieBase(), maxAge: 365 * 24 * 60 * 60 * 1000 });
};

// ── Seed Admin ────────────────────────────────────────────────────────────────
const seedAdmin = async (req, res) => {
  try {
    const { seedSecret, name, email, password } = req.body;
    if (!seedSecret || seedSecret !== process.env.SEED_SECRET)
      return res.status(403).json({ message: 'Forbidden' });
    if (!name || !email || !password)
      return res.status(400).json({ message: 'name, email and password required' });

    const count = await User.countDocuments();
    if (count >= MAX_ADMINS)
      return res.status(409).json({ message: 'Max admins reached' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already in use' });

    await User.create({ name, email, password });
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── Login ─────────────────────────────────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await user.comparePassword(password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const { accessToken, refreshToken } = generateTokens(user._id);
    user.refreshTokens.push(refreshToken);
    if (user.refreshTokens.length > 5) user.refreshTokens = user.refreshTokens.slice(-5);
    await user.save();

    setTokenCookies(res, accessToken, refreshToken);
    res.json({ user, message: 'Logged in successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── Refresh ───────────────────────────────────────────────────────────────────
const refresh = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: 'No refresh token' });

    let decoded;
    try { decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET); }
    catch { return res.status(401).json({ message: 'Invalid refresh token' }); }

    const user = await User.findById(decoded.userId);
    if (!user || !user.refreshTokens.includes(token))
      return res.status(401).json({ message: 'Refresh token revoked' });

    user.refreshTokens = user.refreshTokens.filter(t => t !== token);
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user._id);
    user.refreshTokens.push(newRefreshToken);
    await user.save();

    setTokenCookies(res, accessToken, newRefreshToken);
    res.json({ message: 'Tokens refreshed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── Logout ────────────────────────────────────────────────────────────────────
const logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (token) {
      const user = await User.findOne({ refreshTokens: token });
      if (user) {
        user.refreshTokens = user.refreshTokens.filter(t => t !== token);
        await user.save();
      }
    }
    res.clearCookie('accessToken',  cookieBase());
    res.clearCookie('refreshToken', cookieBase());
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── Get Me ────────────────────────────────────────────────────────────────────
const getMe = async (req, res) => res.json({ user: req.user });

// ── List Admins ───────────────────────────────────────────────────────────────
const listAdmins = async (req, res) => {
  try {
    const admins = await User.find({}, 'name email createdAt');
    res.json({ admins });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── Add Admin ─────────────────────────────────────────────────────────────────
const addAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'name, email and password required' });

    const count = await User.countDocuments();
    if (count >= MAX_ADMINS)
      return res.status(409).json({ message: `Maximum ${MAX_ADMINS} admins allowed` });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already in use' });

    const user = await User.create({ name, email, password });
    res.status(201).json({ user, message: 'Admin added successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── Remove Admin ──────────────────────────────────────────────────────────────
const removeAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    if (id === req.user._id.toString())
      return res.status(400).json({ message: 'Cannot remove yourself' });

    const count = await User.countDocuments();
    if (count <= 1)
      return res.status(400).json({ message: 'Cannot remove the last admin' });

    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'Admin not found' });

    res.json({ message: 'Admin removed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { seedAdmin, login, refresh, logout, getMe, listAdmins, addAdmin, removeAdmin };