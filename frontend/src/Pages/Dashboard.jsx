import { useState, useEffect } from "react";
import {
  FaSignOutAlt, FaSave, FaRedo, FaPlus, FaTrash,
  FaChartBar, FaTags, FaUserShield, FaUserPlus,
} from "react-icons/fa";
import { MdPercent, MdPriceChange } from "react-icons/md";
import logo from "../assets/construction.png";
import api from "../utils/api";

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_BUILD_TYPES = {
  "Basic / Economy":        1850,
  "Standard RCC":           2350,
  "Semi-Premium":           2900,
  "Premium / Luxury":       3700,
  "Ultra-Luxury / Custom":  5000,
};
const DEFAULT_FINISH_LEVELS = {
  Basic:    { mul: 0.90, desc: "Plain plaster, basic tiles, no POP" },
  Standard: { mul: 1.00, desc: "Good tiles, POP, modular switches" },
  Premium:  { mul: 1.20, desc: "Italian marble, premium sanitary" },
  Luxury:   { mul: 1.45, desc: "Imported stone, automation, high-end fixtures" },
};
const DEFAULT_ADD_ONS = [
  { key: "parking",   label: "Car Parking",        fixed: 180000, note: "Covered RCC slab" },
  { key: "garden",    label: "Garden / Landscape",  fixed: 120000, note: "Basic landscaping" },
  { key: "solar",     label: "Solar Panels (3kW)",  fixed: 210000, note: "Grid-tied system" },
  { key: "rainwater", label: "Rainwater Harvest",   fixed:  95000, note: "Underground tank" },
  { key: "genset",    label: "Generator Backup",    fixed: 165000, note: "7.5 kVA diesel genset" },
  { key: "cctv",      label: "CCTV + Security",     fixed:  85000, note: "8 cam IP system" },
];

const TABS = [
  { id: "build",  label: "Build Types",   icon: FaChartBar },
  { id: "finish", label: "Finish Levels", icon: FaTags },
  { id: "rates",  label: "Tax & Rates",   icon: MdPercent },
  { id: "addons", label: "Add-ons",       icon: FaPlus },

];

const fmtINR = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const toPlainObj = (val) => (!val || typeof val !== "object" || Array.isArray(val)) ? val : { ...val };

// ── Sub components ────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, color = "#f59e0b" }) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
        <Icon size={18} style={{ color }} />
      </div>
      <div>
        <div className="text-gray-600 text-xs mb-0.5">{label}</div>
        <div className="text-white font-bold text-xl">{value}</div>
        {sub && <div className="text-gray-700 text-[11px] mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
      <h3 className="text-white font-bold text-[15px] mb-5">{title}</h3>
      {children}
    </div>
  );
}

const inputCls = "w-full bg-[#111] border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-sm outline-none focus:border-amber-500/60 transition-colors";

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Dashboard({ user, onLogout }) {
  const [tab,          setTab]         = useState("build");
  const [saved,        setSaved]       = useState(false);
  const [isSaving,     setIsSaving]    = useState(false);
  const [isLoading,    setIsLoading]   = useState(true);
  const [fetchError,   setFetchError]  = useState("");

  // Pricing state
  const [buildTypes,   setBuildTypes]   = useState(structuredClone(DEFAULT_BUILD_TYPES));
  const [finishLevels, setFinishLevels] = useState(structuredClone(DEFAULT_FINISH_LEVELS));
  const [gstRate,      setGstRate]      = useState(5);
  const [archRate,     setArchRate]     = useState(6);
  const [contingency,  setContingency]  = useState(8);
  const [addOns,       setAddOns]       = useState(structuredClone(DEFAULT_ADD_ONS));
  const [newBuildName, setNewBuildName] = useState("");
  const [newBuildRate, setNewBuildRate] = useState("");

  // Admin state
  const [admins,       setAdmins]       = useState([]);


  // ── Load pricing ────────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/pricing");
        const p = data.pricing;
        setBuildTypes(toPlainObj(p.buildTypes)     || DEFAULT_BUILD_TYPES);
        setFinishLevels(toPlainObj(p.finishLevels) || DEFAULT_FINISH_LEVELS);
        setGstRate(p.gstRate         ?? 5);
        setArchRate(p.archRate       ?? 6);
        setContingency(p.contingency ?? 8);
        setAddOns(p.addOns           || DEFAULT_ADD_ONS);
      } catch {
        setFetchError("Could not load pricing — showing defaults.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // ── Save pricing ────────────────────────────────────────────────────────────
const handleSave = async () => {

  setIsSaving(true);

  try {

    await api.post("/pricing", {
      buildTypes,
      finishLevels,
      gstRate,
      archRate,
      contingency,
      addOns
    });

    // notify calculator to refresh pricing
    window.dispatchEvent(new Event("pricingUpdated"));

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);

  } catch (err) {

    alert("❌ " + (err.response?.data?.message || err.message));

  } finally {

    setIsSaving(false);

  }

};

  const handleReset = () => {
    setBuildTypes(structuredClone(DEFAULT_BUILD_TYPES));
    setFinishLevels(structuredClone(DEFAULT_FINISH_LEVELS));
    setGstRate(5); setArchRate(6); setContingency(8);
    setAddOns(structuredClone(DEFAULT_ADD_ONS));
  };

  const handleLogout = async () => {
    await api.post("/auth/logout");
    onLogout();
  };





  // ── Build type helpers ───────────────────────────────────────────────────────
  const updateBuildRate = (k, v) => setBuildTypes((p) => ({ ...p, [k]: Number(v) }));
  const deleteBuildType = (k)    => setBuildTypes((p) => { const n = { ...p }; delete n[k]; return n; });
  const addBuildType    = ()     => {
    if (!newBuildName.trim() || !newBuildRate) return;
    setBuildTypes((p) => ({ ...p, [newBuildName.trim()]: Number(newBuildRate) }));
    setNewBuildName(""); setNewBuildRate("");
  };
  const updateFinishMul  = (k, v) => setFinishLevels((p) => ({ ...p, [k]: { ...p[k], mul: Number(v) } }));
  const updateFinishDesc = (k, v) => setFinishLevels((p) => ({ ...p, [k]: { ...p[k], desc: v } }));
  const updateAddOn = (i, f, v)   =>
    setAddOns((p) => p.map((a, idx) => idx === i ? { ...a, [f]: f === "fixed" ? Number(v) : v } : a));
  const removeAddOn  = (i) => setAddOns((p) => p.filter((_, idx) => idx !== i));
  const addNewAddOn  = ()  =>
    setAddOns((p) => [...p, { key: `addon_${Date.now()}`, label: "New Add-on", fixed: 100000, note: "Description" }]);

  const vals = Object.values(buildTypes);
  const minRate = vals.length ? Math.min(...vals) : 0;
  const maxRate = vals.length ? Math.max(...vals) : 0;

  if (isLoading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600 text-sm">Loading…</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(245,158,11,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,0.02) 1px,transparent 1px)`,
        backgroundSize: "40px 40px",
      }}
    >
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-[rgba(10,10,10,0.95)] backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img src={logo} alt="AV" className="w-8 h-8 object-contain" />
            <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 22 }} className="text-white tracking-widest">
              AV<span className="text-amber-500"> DASHBOARD</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-2 bg-white/[0.03] border border-white/[0.07] rounded-lg px-3.5 py-2 text-xs text-gray-400">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              {user?.name || user?.email}
            </span>
            <button onClick={handleLogout}
              className="flex items-center gap-2 bg-white/[0.04] border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500/30 px-3.5 py-2 rounded-lg text-xs font-medium cursor-pointer transition-all">
              <FaSignOutAlt size={12} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-6 py-8">
        {fetchError && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">⚠️ {fetchError}</div>
        )}

        <div className="mb-8">
          <span className="text-[11px] tracking-[0.25em] uppercase text-amber-500 font-semibold">Admin Panel</span>
          <h1 className="text-white mt-1" style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(36px,5vw,56px)" }}>
            CALCULATOR <span className="text-amber-500">SETTINGS</span>
          </h1>
          <p className="text-gray-600 text-sm mt-1">Changes save to database and apply to the public calculator immediately.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={FaChartBar}    label="Build Types"   value={Object.keys(buildTypes).length} sub="variants" />
          <StatCard icon={MdPriceChange} label="Rate Range"    value={`₹${(minRate/1000).toFixed(0)}k–${(maxRate/1000).toFixed(0)}k`} sub="per sqft" color="#10b981" />
          <StatCard icon={MdPercent}     label="Total Overhead" value={`${(gstRate+archRate+contingency).toFixed(0)}%`} sub="GST+Arch+Cont" color="#8b5cf6" />
          <StatCard icon={FaUserShield}  label="Admins"        value={`${admins.length || "?"} / 2`} sub="max 2 allowed" color="#f43f5e" />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all border ${
                tab === id
                  ? "bg-gradient-to-br from-amber-500 to-amber-600 text-[#111] border-transparent"
                  : "bg-white/[0.03] border-white/[0.08] text-gray-400 hover:text-white hover:border-white/20"
              }`}>
              <Icon size={13} /> {label}
            </button>
          ))}
        </div>

        {/* ── BUILD TYPES ── */}
        {tab === "build" && (
          <Section title="🏗️ Construction Types & Base Rates (₹/sqft)">
            <div className="flex flex-col gap-3 mb-6">
              {Object.entries(buildTypes).map(([name, rate]) => (
                <div key={name} className="flex items-center gap-3 p-3.5 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                  <div className="flex-1 min-w-0 text-white text-sm font-semibold truncate">{name}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 text-xs">₹/sqft</span>
                    <input className="w-28 bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-amber-400 text-sm font-bold outline-none focus:border-amber-500/60 text-right"
                      type="number" value={rate} onChange={(e) => updateBuildRate(name, e.target.value)} />
                    <button onClick={() => deleteBuildType(name)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 cursor-pointer transition-all">
                      <FaTrash size={11} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-white/[0.06] pt-5">
              <p className="text-gray-600 text-xs mb-3">Add new type</p>
              <div className="flex gap-2 flex-wrap">
                <input className={`${inputCls} flex-1 min-w-[180px]`} placeholder="Type name"
                  value={newBuildName} onChange={(e) => setNewBuildName(e.target.value)} />
                <input className="w-32 bg-[#111] border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-sm outline-none focus:border-amber-500/60"
                  type="number" placeholder="₹/sqft" value={newBuildRate} onChange={(e) => setNewBuildRate(e.target.value)} />
                <button onClick={addBuildType}
                  className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer hover:bg-amber-500/20 transition-all flex items-center gap-1.5">
                  <FaPlus size={11} /> Add
                </button>
              </div>
            </div>
          </Section>
        )}

        {/* ── FINISH LEVELS ── */}
        {tab === "finish" && (
          <Section title="✨ Finish Level Multipliers">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(finishLevels).map(([key, { mul, desc }]) => (
                <div key={key} className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-amber-500 font-bold text-[15px]">{key}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 text-xs">Multiplier</span>
                      <input className="w-20 bg-[#111] border border-white/10 rounded-lg px-2.5 py-1.5 text-amber-400 text-sm font-bold outline-none focus:border-amber-500/60 text-center"
                        type="number" step="0.01" min="0.5" max="3" value={mul}
                        onChange={(e) => updateFinishMul(key, e.target.value)} />
                    </div>
                  </div>
                  <input className={inputCls} value={desc} placeholder="Description"
                    onChange={(e) => updateFinishDesc(key, e.target.value)} />
                  <div className="mt-2 text-xs text-gray-700">
                    Effect: <span className="text-amber-600">{(mul * 100 - 100) > 0 ? '+' : ''}{(mul * 100 - 100).toFixed(0)}% adjustment</span>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ── TAX & RATES ── */}
        {tab === "rates" && (
          <Section title="📊 Tax, Fees & Overhead Rates">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { label: "GST Rate",               val: gstRate,     set: setGstRate,     color: "#f43f5e" },
                { label: "Architect & Design Fee",  val: archRate,    set: setArchRate,    color: "#8b5cf6" },
                { label: "Contingency Reserve",     val: contingency, set: setContingency, color: "#10b981" },
              ].map(({ label, val, set, color }) => (
                <div key={label} className="p-5 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                  <div className="text-gray-500 text-xs mb-2">{label}</div>
                  <div className="flex items-end gap-2 mb-3">
                    <input className="w-24 bg-[#111] border border-white/10 rounded-xl px-3 py-3 text-2xl font-bold outline-none focus:border-amber-500/60 text-center"
                      style={{ color }} type="number" step="0.5" min="0" max="50" value={val}
                      onChange={(e) => set(Number(e.target.value))} />
                    <span className="text-gray-500 text-xl mb-1">%</span>
                  </div>
                  <div className="mt-3 h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${Math.min(val * 3, 100)}%`, background: color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 p-4 bg-amber-500/[0.05] border border-amber-500/20 rounded-xl text-sm">
              <strong className="text-amber-500">Total Overhead: </strong>
              <span className="text-gray-400">{(gstRate + archRate + contingency).toFixed(1)}% on top of base cost</span>
            </div>
          </Section>
        )}

        {/* ── ADD-ONS ── */}
        {tab === "addons" && (
          <Section title="🔧 Optional Add-ons">
            <div className="flex flex-col gap-3 mb-5">
              {addOns.map((a, i) => (
                <div key={a.key} className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                    <input className={inputCls} value={a.label} placeholder="Label"
                      onChange={(e) => updateAddOn(i, "label", e.target.value)} />
                    <input className={inputCls} value={a.note} placeholder="Short description"
                      onChange={(e) => updateAddOn(i, "note", e.target.value)} />
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 text-xs whitespace-nowrap">Base cost (₹)</span>
                      <input className="flex-1 bg-[#111] border border-white/10 rounded-xl px-3 py-2.5 text-amber-400 font-bold text-sm outline-none focus:border-amber-500/60"
                        type="number" value={a.fixed} onChange={(e) => updateAddOn(i, "fixed", e.target.value)} />
                      <button onClick={() => removeAddOn(i)}
                        className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 cursor-pointer transition-all">
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="text-gray-700 text-[11px] mt-2">{a.label} · {fmtINR(a.fixed)} base</div>
                </div>
              ))}
            </div>
            <button onClick={addNewAddOn}
              className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 border-dashed text-amber-500 px-5 py-3 rounded-xl text-sm font-semibold cursor-pointer hover:bg-amber-500/20 transition-all w-full justify-center">
              <FaPlus size={12} /> Add New Add-on
            </button>
          </Section>
        )}




      </main>
    </div>
  );
}