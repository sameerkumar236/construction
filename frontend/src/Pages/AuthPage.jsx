import { useState } from "react";
import { FaEye, FaEyeSlash, FaArrowRight, FaLock } from "react-icons/fa";
import { MdEmail, MdLock } from "react-icons/md";
import logo from "../assets/construction.png";
import api from "../utils/api";

export default function AuthPage({ onAuthSuccess }) {
  const [form,     setForm]     = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const handle = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async () => {
    setError("");
    if (!form.email || !form.password) return setError("Email and password are required.");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", form);
      onAuthSuccess(data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-white text-sm outline-none focus:border-amber-500/70 focus:bg-white/[0.06] transition-all placeholder-gray-700";

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 relative overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      {/* Glow blobs */}
      <div
        className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle, #f59e0b, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #f59e0b, transparent 70%)" }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-2.5 justify-center mb-10">
          <img src={logo} alt="AV Construction" className="w-10 h-10 object-contain" />
          <span
            className="text-white tracking-[0.12em]"
            style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 26 }}
          >
            AV<span className="text-amber-500"> Construction</span>
          </span>
        </div>

        {/* Card */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 shadow-2xl">

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center">
              <FaLock size={16} className="text-amber-500" />
            </div>
            <div>
              <h2
                className="text-white leading-none"
                style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 28 }}
              >
                Admin Access
              </h2>
              <p className="text-gray-600 text-xs mt-0.5">Restricted — authorized personnel only</p>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-7 leading-relaxed">
            Sign in to access the pricing dashboard and calculator settings.
          </p>

          <div className="flex flex-col gap-4">
            {/* Email */}
            <div className="relative">
              <MdEmail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
              <input
                className={inputCls}
                type="email"
                name="email"
                placeholder="Admin email"
                value={form.email}
                onChange={handle}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <MdLock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
              <input
                className={`${inputCls} pr-11`}
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handle}
                onKeyDown={(e) => e.key === "Enter" && submit()}
              />
              <button
                onClick={() => setShowPass((p) => !p)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 bg-transparent border-none cursor-pointer"
              >
                {showPass ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-lg px-3.5 py-2.5 text-red-400 text-xs">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={submit}
            disabled={loading}
            className="mt-6 w-full bg-gradient-to-br from-amber-500 to-amber-600 text-[#111] py-3.5 rounded-xl font-bold text-[14px] cursor-pointer flex items-center justify-center gap-2 hover:from-amber-400 hover:to-amber-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-[#111]/40 border-t-[#111] rounded-full animate-spin" />
            ) : (
              <>
                Sign In to Dashboard <FaArrowRight size={12} />
              </>
            )}
          </button>
        </div>

        <p className="text-center text-gray-800 text-[11px] mt-5">
          No public registration · Admin accounts are created by the system owner
        </p>
      </div>
    </div>
  );
}