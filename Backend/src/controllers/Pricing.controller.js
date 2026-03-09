const Pricing = require('../models/Pricing.modle');  

const DEFAULTS = {
  buildTypes: {
    'Basic / Economy':       1850,
    'Standard RCC':          2350,
    'Semi-Premium':          2900,
    'Premium / Luxury':      3700,
    'Ultra-Luxury / Custom': 5000,
  },
  finishLevels: {
    Basic:    { mul: 0.90, desc: 'Plain plaster, basic tiles, no POP' },
    Standard: { mul: 1.00, desc: 'Good tiles, POP, modular switches' },
    Premium:  { mul: 1.20, desc: 'Italian marble, premium sanitary' },
    Luxury:   { mul: 1.45, desc: 'Imported stone, automation, high-end fixtures' },
  },
  gstRate:     5,
  archRate:    6,
  contingency: 8,
  addOns: [
    { key: 'parking',   label: 'Car Parking',        fixed: 180000, note: 'Covered RCC slab' },
    { key: 'garden',    label: 'Garden / Landscape',  fixed: 120000, note: 'Basic landscaping' },
    { key: 'solar',     label: 'Solar Panels (3kW)',  fixed: 210000, note: 'Grid-tied system' },
    { key: 'rainwater', label: 'Rainwater Harvest',   fixed:  95000, note: 'Underground tank' },
    { key: 'genset',    label: 'Generator Backup',    fixed: 165000, note: '7.5 kVA diesel genset' },
    { key: 'cctv',      label: 'CCTV + Security',     fixed:  85000, note: '8 cam IP system' },
  ],
};

// ── GET pricing (public) ──────────────────────────────────────────────────────
const getPricing = async (req, res) => {
  try {
    const doc     = await Pricing.findOne();
    const pricing = doc || DEFAULTS;

    // MongoDB Map → plain object convert karo
    const plain = {
      buildTypes:   doc ? Object.fromEntries(doc.buildTypes)   : pricing.buildTypes,
      finishLevels: doc ? Object.fromEntries(
        [...doc.finishLevels.entries()].map(([k, v]) => [k, { mul: v.mul, desc: v.desc }])
      ) : pricing.finishLevels,
      gstRate:     pricing.gstRate,
      archRate:    pricing.archRate,
      contingency: pricing.contingency,
      addOns:      pricing.addOns,
    };

    res.json({ pricing: plain });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── SAVE pricing (admin only) ─────────────────────────────────────────────────
const savePricing = async (req, res) => {
  try {
    const { buildTypes, finishLevels, gstRate, archRate, contingency, addOns } = req.body;
    if (!buildTypes || !finishLevels || !addOns)
      return res.status(400).json({ message: 'Missing pricing fields' });

    const doc = await Pricing.findOneAndUpdate(
      {},
      { buildTypes, finishLevels, gstRate, archRate, contingency, addOns, updatedBy: req.user._id },
      { upsert: true, new: true }
    );

    // Return as plain object too
    const plain = {
      buildTypes:   Object.fromEntries(doc.buildTypes),
      finishLevels: Object.fromEntries(
        [...doc.finishLevels.entries()].map(([k, v]) => [k, { mul: v.mul, desc: v.desc }])
      ),
      gstRate:     doc.gstRate,
      archRate:    doc.archRate,
      contingency: doc.contingency,
      addOns:      doc.addOns,
    };

    res.json({ pricing: plain, message: 'Pricing saved successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getPricing, savePricing };