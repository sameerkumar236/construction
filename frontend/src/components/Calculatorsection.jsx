// import { useState, useEffect } from "react";
// import { FaCalculator, FaArrowRight, FaCheckCircle } from "react-icons/fa";
// import { MdLocationOn, MdInfo, MdMyLocation } from "react-icons/md";
// import {
//   BUILD_TYPES,
//   FINISH_LEVELS,
//   FLOOR_OPTS,
//   CITY_INDEX,
//   STATE_FALLBACKS,
//   CITIES_LIST,
//   ADD_ONS,
//   GST_RATE,
//   ARCHITECT_RATE,
//   CONTINGENCY,
// } from "../data/calculatotdata";

// // ─── Formatters ───────────────────────────────────────────────────────────────
// const fmtINR = (n) =>
//   new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

// const fmtLakh = (n) => {
//   if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
//   if (n >= 100000)   return `₹${(n / 100000).toFixed(2)} L`;
//   return fmtINR(n);
// };

// // ─── Tooltip ──────────────────────────────────────────────────────────────────
// function InfoTip({ text }) {
//   const [v, setV] = useState(false);
//   return (
//     <span
//       className="relative inline-flex items-center cursor-help"
//       onMouseEnter={() => setV(true)}
//       onMouseLeave={() => setV(false)}
//     >
//       <MdInfo size={14} className="text-gray-500 ml-1" />
//       {v && (
//         <span className="absolute bottom-full left-1/2 -translate-x-1/2 bg-[#1c1c1c] border border-amber-500/30 text-gray-400 text-[11px] px-2.5 py-1.5 rounded-lg whitespace-nowrap z-20">
//           {text}
//         </span>
//       )}
//     </span>
//   );
// }

// // ─── Bar Row ──────────────────────────────────────────────────────────────────
// function BarRow({ label, value, total, color }) {
//   const pct = total > 0 ? Math.min(100, (value / total) * 100) : 0;
//   return (
//     <div className="mb-2.5">
//       <div className="flex justify-between mb-1 text-xs">
//         <span className="text-gray-500">{label}</span>
//         <span className="text-white font-semibold">{fmtLakh(value)}</span>
//       </div>
//       <div className="h-1.5 bg-[#1f1f1f] rounded-full overflow-hidden">
//         <div
//           className="h-full rounded-full transition-all duration-1000"
//           style={{ width: `${pct}%`, background: color }}
//         />
//       </div>
//     </div>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────
// export default function CalculatorSection({ onScrollTo }) {
//   const [area,       setArea]      = useState("");
//   const [areaUnit,   setAreaUnit]  = useState("sqft");
//   const [buildType,  setBuildType] = useState(Object.keys(BUILD_TYPES)[0]);
//   const [finish,     setFinish]    = useState("Standard");
//   const [floorIdx,   setFloorIdx]  = useState(0);
//   const [addOns,     setAddOns]    = useState(Object.fromEntries(ADD_ONS.map(a => [a.key, false])));
//   const [includeGST,       setIncludeGST]      = useState(true);
//   const [includeArchitect, setIncludeArchitect] = useState(true);
//   const [result, setResult] = useState(null);
//   const [error,  setError]  = useState("");
//   const [selectedCity,   setSelectedCity]   = useState("Faridabad / NCR");
//   const [cityMul,        setCityMul]        = useState(1.40);
//   const [detectedLabel,  setDetectedLabel]  = useState("");
//   const [locStatus,      setLocStatus]      = useState("detecting");

//   useEffect(() => {
//     const detect = async () => {
//       try {
//         const res  = await fetch("https://ipapi.co/json/");
//         if (!res.ok) throw new Error("API error");
//         const data = await res.json();
//         const rawCity  = (data.city  || "").toLowerCase().trim();
//         const rawState = (data.region || "").toLowerCase().trim();
//         if (CITY_INDEX[rawCity]) {
//           const match = CITY_INDEX[rawCity];
//           setSelectedCity(match.display);
//           setCityMul(match.mul);
//           setDetectedLabel(`${data.city}, ${data.region}`);
//           setLocStatus("found");
//           return;
//         }
//         if (STATE_FALLBACKS[rawState]) {
//           const match = STATE_FALLBACKS[rawState];
//           setSelectedCity(match.display);
//           setCityMul(match.mul);
//           setDetectedLabel(`${data.city} → using ${match.display} rates`);
//           setLocStatus("found");
//           return;
//         }
//         setDetectedLabel(`${data.city}, ${data.region}`);
//         setLocStatus("manual");
//       } catch {
//         setLocStatus("failed");
//       }
//     };
//     detect();
//   }, []);

//   const handleCityChange = (displayName) => {
//     const found = CITIES_LIST.find(c => c.display === displayName);
//     if (found) {
//       setSelectedCity(found.display);
//       setCityMul(found.mul);
//       setLocStatus("manual");
//       setResult(null);
//     }
//   };

//   const toSqft = (val, unit) => {
//     const n = parseFloat(val);
//     if (unit === "sqm")  return n * 10.764;
//     if (unit === "gaj")  return n * 9;
//     return n;
//   };

//   const toggleAddOn = (key) => {
//     setAddOns(p => ({ ...p, [key]: !p[key] }));
//     setResult(null);
//   };

//   const calculate = () => {
//     const rawArea = parseFloat(area);
//     if (!area || isNaN(rawArea) || rawArea <= 0) {
//       setError("Area is required and must be greater than 0.");
//       return;
//     }
//     if (rawArea > 500000) {
//       setError("Area seems too large. Please verify.");
//       return;
//     }
//     setError("");
//     const sqftArea     = toSqft(rawArea, areaUnit);
//     const baseRate     = BUILD_TYPES[buildType];
//     const finishMul    = FINISH_LEVELS[finish].mul;
//     const floorSur     = FLOOR_OPTS[floorIdx].sur;
//     const baseCost     = sqftArea * baseRate * finishMul * (1 + floorSur) * cityMul;
//     const architectFee = includeArchitect ? baseCost * ARCHITECT_RATE : 0;
//     let addOnTotal = 0;
//     const addOnBreakdown = [];
//     ADD_ONS.forEach(a => {
//       if (addOns[a.key]) {
//         const cost = a.fixed * cityMul;
//         addOnTotal += cost;
//         addOnBreakdown.push({ label: a.label, cost });
//       }
//     });
//     const subtotal    = baseCost + architectFee + addOnTotal;
//     const contingency = subtotal * CONTINGENCY;
//     const preTax      = subtotal + contingency;
//     const gst         = includeGST ? preTax * GST_RATE : 0;
//     const grandTotal  = preTax + gst;
//     setResult({
//       sqftArea, baseCost, architectFee,
//       addOnTotal, addOnBreakdown,
//       contingency, gst, grandTotal,
//       perSqft: grandTotal / sqftArea,
//       lowEst:  grandTotal * 0.88,
//       highEst: grandTotal * 1.18,
//     });
//   };

//   const reset = () => {
//     setArea(""); setAreaUnit("sqft");
//     setBuildType(Object.keys(BUILD_TYPES)[0]);
//     setFinish("Standard"); setFloorIdx(0);
//     setAddOns(Object.fromEntries(ADD_ONS.map(a => [a.key, false])));
//     setIncludeGST(true); setIncludeArchitect(true);
//     setResult(null); setError("");
//   };

//   // ─── Location Badge ────────────────────────────────────────────────────────
//   const LocBadge = () => {
//     if (locStatus === "detecting") return (
//       <span className="flex items-center gap-1.5 text-[11px] text-gray-500">
//         <span className="w-2 h-2 rounded-full bg-amber-500 inline-block animate-pulse" />
//         Detecting your location via IP…
//       </span>
//     );
//     if (locStatus === "found") return (
//       <span className="flex items-center gap-1.5 text-[11px] text-green-500">
//         <FaCheckCircle size={11} />
//         Auto-detected: <strong className="text-green-400">{detectedLabel}</strong>
//       </span>
//     );
//     if (locStatus === "manual") return (
//       <span className="flex items-center gap-1.5 text-[11px] text-amber-500">
//         <MdMyLocation size={12} />
//         {detectedLabel ? `Detected: ${detectedLabel} — select closest city below` : "Select your city manually"}
//       </span>
//     );
//     return (
//       <span className="flex items-center gap-1.5 text-[11px] text-red-500">
//         <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
//         Location unavailable — please select manually
//       </span>
//     );
//   };

//   // ─── Shared input/select class ─────────────────────────────────────────────
//   const inputCls = "w-full bg-white/5 border border-white/10 rounded-[10px] px-4 py-3 text-white text-sm outline-none focus:border-amber-500 transition-colors";

//   return (
//     <section
//       id="calculator"
//       className="py-24 px-6 bg-[#111]"
//       style={{
//         backgroundImage: `
//           linear-gradient(rgba(245,158,11,0.025) 1px, transparent 1px),
//           linear-gradient(90deg, rgba(245,158,11,0.025) 1px, transparent 1px)
//         `,
//         backgroundSize: "40px 40px",
//       }}
//     >
//       <div className="max-w-[1240px] mx-auto">
//         {/* Header */}
//         <span className="block text-[11px] tracking-[0.25em] uppercase text-amber-500 font-semibold mb-3">
//           Real Cost Estimator
//         </span>
//         <h2
//           className="text-amber-500 mb-2"
//           style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(40px,6vw,72px)" }}
//         >
//           COST <span className="text-amber-500">CALCULATOR</span>
//         </h2>
//         <p className="text-gray-600 text-sm mb-9 max-w-xl">
//           Your location is auto-detected via{" "}
//           <strong className="text-gray-400">ipapi.co</strong> (free API) — city cost index applies automatically. You can override anytime.
//         </p>
//         <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mb-12" />

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 items-start">

//           {/* ════════ INPUT PANEL ════════ */}
//           <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8">
//             {/* Panel Header */}
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="font-bold text-[17px] text-white flex items-center gap-2">
//                 <FaCalculator className="text-amber-500" /> Enter Your Details
//               </h3>
//               <button
//                 onClick={reset}
//                 className="bg-transparent border border-[#2a2a2a] text-gray-600 text-xs px-3 py-1 rounded-md cursor-pointer hover:border-gray-600 hover:text-gray-400 transition-colors"
//               >
//                 Reset
//               </button>
//             </div>

//             {/* Area */}
//             <div className="mb-5">
//               <label className="text-gray-500 text-[13px] flex items-center mb-1.5">
//                 Construction Area *
//                 <InfoTip text="Total built-up area across all floors" />
//               </label>
//               <div className="flex gap-2 w-full">
//                 <input
//                   className={`${inputCls} w-0 flex-[3] min-w-0`}
//                   type="number"
//                   min="1"
//                   placeholder="e.g. 1200"
//                   value={area}
//                   onChange={e => { setArea(e.target.value); setResult(null); setError(""); }}
//                 />
//                 <select
//                   className={`${inputCls} flex-[1] min-w-0 appearance-none`}
//                   style={{ background: "#1a1a1a" }}
//                   value={areaUnit}
//                   onChange={e => { setAreaUnit(e.target.value); setResult(null); }}
//                 >
//                   <option value="sqft">sqft</option>
//                   <option value="sqm">sq.m</option>
//                   <option value="gaj">Gaj</option>
//                 </select>
//               </div>
//               {area && !isNaN(parseFloat(area)) && parseFloat(area) > 0 && (() => {
//                 const sf = toSqft(parseFloat(area), areaUnit);
//                 return (
//                   <div className="text-gray-600 text-xs mt-1.5 flex gap-3.5">
//                     <span>{sf.toFixed(0)} sqft</span>
//                     <span>{(sf * 0.0929).toFixed(1)} sq.m</span>
//                     <span>{(sf / 9).toFixed(1)} Gaj</span>
//                   </div>
//                 );
//               })()}
//               {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
//             </div>

//             {/* Construction Type */}
//             <div className="mb-5">
//               <label className="text-gray-500 text-[13px] flex items-center mb-1.5">
//                 Construction Type
//                 <InfoTip text="Based on CPWD Schedule of Rates 2024" />
//               </label>
//               <select
//                 className={`${inputCls} appearance-none`}
//                 style={{ background: "#1a1a1a" }}
//                 value={buildType}
//                 onChange={e => { setBuildType(e.target.value); setResult(null); }}
//               >
//                 {Object.entries(BUILD_TYPES).map(([k, v]) => (
//                   <option key={k} value={k} style={{ background: "#1a1a1a" }}>
//                     {k} — ₹{v.toLocaleString("en-IN")}/sqft
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Finish Level */}
//             <div className="mb-5">
//               <label className="text-gray-500 text-[13px] block mb-2">
//                 Interior Finish Level
//               </label>
//               <div className="grid grid-cols-4 gap-2">
//                 {Object.entries(FINISH_LEVELS).map(([f, { mul }]) => (
//                   <button
//                     key={f}
//                     onClick={() => { setFinish(f); setResult(null); }}
//                     className={`rounded-lg text-[13px] font-semibold cursor-pointer py-2.5 px-4 transition-all border text-center ${
//                       finish === f
//                         ? "bg-gradient-to-br from-amber-500 to-amber-600 text-[#111] border-transparent"
//                         : "bg-white/[0.03] border-white/10 text-gray-400 hover:text-white hover:border-white/20"
//                     }`}
//                   >
//                     {f}
//                     <div className="text-[10px] opacity-70 mt-0.5">×{mul}</div>
//                   </button>
//                 ))}
//               </div>
//               <p className="text-gray-600 text-[11px] mt-1.5">{FINISH_LEVELS[finish].desc}</p>
//             </div>

//             {/* Floors */}
//             <div className="mb-5">
//               <label className="text-gray-500 text-[13px] flex items-center mb-2">
//                 Building Height / Floors
//                 <InfoTip text="More floors = extra structural steel and RCC cost" />
//               </label>
//               <div className="grid grid-cols-3 gap-2">
//                 {FLOOR_OPTS.map((f, i) => (
//                   <button
//                     key={i}
//                     onClick={() => { setFloorIdx(i); setResult(null); }}
//                     className={`rounded-lg text-[13px] font-semibold cursor-pointer py-2.5 px-4 transition-all border text-center ${
//                       floorIdx === i
//                         ? "bg-gradient-to-br from-amber-500 to-amber-600 text-[#111] border-transparent"
//                         : "bg-white/[0.03] border-white/10 text-gray-400 hover:text-white hover:border-white/20"
//                     }`}
//                   >
//                     {f.label}
//                     {f.sur > 0 && <div className="text-[9px] opacity-70 mt-0.5">+{(f.sur * 100).toFixed(0)}%</div>}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Location */}
//             <div className="mb-5">
//               <label className="text-gray-500 text-[13px] flex items-center mb-1.5">
//                 <MdLocationOn size={14} className="text-amber-500 mr-1" />
//                 Project City
//                 <InfoTip text="Auto-detected from your IP via ipapi.co. Change if project is in a different city." />
//               </label>
//               <div className="mb-2"><LocBadge /></div>
//               <select
//                 className={`${inputCls} appearance-none`}
//                 style={{ background: "#1a1a1a" }}
//                 value={selectedCity}
//                 onChange={e => handleCityChange(e.target.value)}
//               >
//                 {CITIES_LIST.map(c => (
//                   <option key={c.display} value={c.display} style={{ background: "#1a1a1a" }}>
//                     {c.display}  (×{c.mul.toFixed(2)})
//                   </option>
//                 ))}
//               </select>
//               <div className="text-xs text-gray-600 mt-1.5 flex gap-2 items-center">
//                 <span>Active cost index:</span>
//                 <span className="text-amber-500 font-bold">×{cityMul.toFixed(2)}</span>
//                 <span className="text-gray-700">
//                   ({cityMul > 1 ? `+${((cityMul - 1) * 100).toFixed(0)}% above` : `${((1 - cityMul) * 100).toFixed(0)}% below`} national avg)
//                 </span>
//               </div>
//             </div>

//             {/* Add-Ons */}
//             <div className="mb-5">
//               <label className="text-gray-500 text-[13px] block mb-2.5">Optional Add-ons</label>
//               <div className="grid grid-cols-2 gap-2">
//                 {ADD_ONS.map(a => (
//                   <label
//                     key={a.key}
//                     className={`flex items-start gap-2.5 p-2.5 rounded-xl cursor-pointer border transition-all ${
//                       addOns[a.key]
//                         ? "border-amber-500/45 bg-amber-500/[0.07]"
//                         : "border-white/[0.07] bg-white/[0.02]"
//                     }`}
//                   >
//                     <input
//                       type="checkbox"
//                       checked={addOns[a.key]}
//                       onChange={() => toggleAddOn(a.key)}
//                       className="mt-0.5 accent-amber-500"
//                     />
//                     <div>
//                       <div className="text-white text-xs font-semibold">{a.label}</div>
//                       <div className="text-gray-600 text-[11px] mt-0.5">{a.note}</div>
//                     </div>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Toggles */}
//             <div className="flex gap-5 mb-6 flex-wrap">
//               <label className="flex items-center gap-1.5 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={includeArchitect}
//                   onChange={e => { setIncludeArchitect(e.target.checked); setResult(null); }}
//                   className="accent-amber-500"
//                 />
//                 <span className="text-gray-500 text-xs">Architect Fees (6%)</span>
//               </label>
//               <label className="flex items-center gap-1.5 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={includeGST}
//                   onChange={e => { setIncludeGST(e.target.checked); setResult(null); }}
//                   className="accent-amber-500"
//                 />
//                 <span className="text-gray-500 text-xs">Include GST (5%)</span>
//               </label>
//             </div>

//             <button
//               onClick={calculate}
//               className="w-full bg-gradient-to-br from-amber-500 to-amber-600 text-[#111] py-4 rounded-xl font-bold text-[15px] cursor-pointer flex items-center justify-center gap-2 hover:from-amber-400 hover:to-amber-500 transition-all"
//             >
//               <FaCalculator /> Calculate Construction Cost
//             </button>
//           </div>

//           {/* ════════ RESULT PANEL ════════ */}
//           <div className="flex flex-col gap-5">
//             {result ? (
//               <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 animate-[fadeUp_0.7s_ease_forwards]">
//                 <h3 className="font-bold text-[17px] text-white mb-1.5">Your Cost Estimate ✅</h3>
//                 <p className="text-gray-600 text-xs mb-5 leading-relaxed">
//                   {result.sqftArea.toFixed(0)} sqft · {buildType} · {finish} · {selectedCity} (×{cityMul.toFixed(2)})
//                 </p>

//                 {/* Grand Total Hero */}
//                 <div className="bg-amber-500/[0.07] border border-amber-500/[0.22] rounded-2xl p-5 text-center mb-5">
//                   <p className="text-gray-500 text-[13px] mb-1">Total Estimated Cost</p>
//                   <p
//                     className="text-amber-500 leading-none"
//                     style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 52 }}
//                   >
//                     {fmtLakh(result.grandTotal)}
//                   </p>
//                   <p className="text-gray-500 text-[13px] mt-2">
//                     {fmtINR(Math.round(result.perSqft))} per sqft
//                   </p>
//                 </div>

//                 {/* Visual Bars */}
//                 <div className="mb-4">
//                   <p className="text-gray-600 text-xs mb-2.5">Cost Distribution</p>
//                   <BarRow label="Base Construction"        value={result.baseCost}     total={result.grandTotal} color="#f59e0b" />
//                   {result.architectFee > 0 &&
//                     <BarRow label="Architect + Design (6%)" value={result.architectFee} total={result.grandTotal} color="#d97706" />}
//                   {result.addOnTotal > 0 &&
//                     <BarRow label="Add-ons"                 value={result.addOnTotal}   total={result.grandTotal} color="#b45309" />}
//                   <BarRow label="Contingency (8%)"         value={result.contingency}  total={result.grandTotal} color="#92400e" />
//                   {result.gst > 0 &&
//                     <BarRow label="GST (5%)"               value={result.gst}          total={result.grandTotal} color="#78350f" />}
//                 </div>

//                 {/* Line Items */}
//                 <div className="border-t border-white/[0.06] pt-3.5 mb-3.5">
//                   {[
//                     { label: "Base Construction Cost",      val: result.baseCost },
//                     ...(result.architectFee > 0 ? [{ label: "Architect + Design Fees (6%)", val: result.architectFee }] : []),
//                     ...result.addOnBreakdown.map(a => ({ label: a.label, val: a.cost })),
//                     { label: "Contingency Reserve (8%)",    val: result.contingency },
//                     ...(result.gst > 0 ? [{ label: "GST @ 5%", val: result.gst }] : []),
//                   ].map((row, i) => (
//                     <div key={i} className="flex justify-between items-center py-2.5 border-b border-white/[0.06] text-sm">
//                       <span className="text-gray-500">{row.label}</span>
//                       <span className="text-white font-semibold">{fmtLakh(row.val)}</span>
//                     </div>
//                   ))}

//                   {/* Grand Total Row */}
//                   <div className="flex justify-between items-center pt-3 border-t border-white/[0.08] mt-1">
//                     <span className="text-amber-500 font-bold text-base">Grand Total</span>
//                     <div className="text-right">
//                       <div className="text-amber-500 font-bold text-[22px]">{fmtLakh(result.grandTotal)}</div>
//                       <div className="text-gray-600 text-[11px]">{fmtINR(Math.round(result.grandTotal))}</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Realistic Range */}
//                 <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3 mb-3.5">
//                   <p className="text-xs leading-relaxed">
//                     <span className="text-gray-400 font-semibold">Realistic Range: </span>
//                     <span className="text-amber-500 font-bold">{fmtLakh(result.lowEst)}</span>
//                     <span className="text-gray-600"> – </span>
//                     <span className="text-amber-500 font-bold">{fmtLakh(result.highEst)}</span>
//                     <br />
//                     <span className="text-gray-700">Varies ±12–18% based on contractor, soil type, material brand, and timeline.</span>
//                   </p>
//                 </div>

//                 {/* Mini Stats */}
//                 <div className="grid grid-cols-3 gap-2.5 mb-4">
//                   {[
//                     { label: "Cost / sqft", val: fmtINR(Math.round(result.perSqft)) },
//                     { label: "Base Rate",   val: `₹${BUILD_TYPES[buildType].toLocaleString("en-IN")}/sqft` },
//                     { label: "Area",        val: `${result.sqftArea.toFixed(0)} sqft` },
//                   ].map((s, i) => (
//                     <div
//                       key={i}
//                       className="bg-amber-500/[0.05] border border-amber-500/10 rounded-xl p-2.5 text-center"
//                     >
//                       <div className="text-amber-500 font-bold text-[13px]">{s.val}</div>
//                       <div className="text-gray-600 text-[11px] mt-0.5">{s.label}</div>
//                     </div>
//                   ))}
//                 </div>

//                 <button
//                   onClick={() => onScrollTo("contact")}
//                   className="w-full bg-gradient-to-br from-amber-500 to-amber-600 text-[#111] py-3.5 rounded-xl font-bold text-sm cursor-pointer flex items-center justify-center gap-2 hover:from-amber-400 hover:to-amber-500 transition-all"
//                 >
//                   Get Formal Quote <FaArrowRight />
//                 </button>
//               </div>
//             ) : (
//               <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-10 flex flex-col items-center justify-center min-h-[300px] text-center">
//                 <FaCalculator size={52} className="text-[#222] mb-4" />
//                 <p className="text-gray-500 text-[15px] leading-relaxed">
//                   Enter your <span className="text-amber-500">area, type & finish</span><br />
//                   then click <strong className="text-amber-500">Calculate</strong>
//                 </p>
//                 <p className="text-[#2a2a2a] text-xs mt-2.5">
//                   City rates applied automatically from detected location
//                 </p>
//               </div>
//             )}

//             {/* Rate Reference */}
//             <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5">
//               <h4 className="font-semibold text-white text-[13px] mb-3">
//                 📋 2024 Base Rates (₹/sqft)
//               </h4>
//               {Object.entries(BUILD_TYPES).map(([k, v]) => (
//                 <div
//                   key={k}
//                   className={`flex justify-between text-xs px-1.5 py-1.5 rounded border-b border-white/[0.04] transition-colors ${
//                     buildType === k ? "bg-amber-500/[0.07]" : ""
//                   }`}
//                 >
//                   <span className={buildType === k ? "text-amber-500" : "text-gray-600"}>
//                     {buildType === k ? "▶ " : ""}{k}
//                   </span>
//                   <span className={`font-semibold ${buildType === k ? "text-amber-500" : "text-gray-500"}`}>
//                     ₹{v.toLocaleString("en-IN")}
//                   </span>
//                 </div>
//               ))}
//               <p className="text-gray-700 text-[11px] mt-2.5 leading-relaxed">
//                 Source: CPWD 2024, NBO India. Location cost index via ipapi.co (free, no key needed).
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Keyframe for fadeUp — inject once */}
//       <style>{`
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(24px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </section>
//   );
// }


import { useState, useEffect } from "react";
import { FaCalculator, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { MdLocationOn, MdInfo, MdMyLocation } from "react-icons/md";
import {
  FLOOR_OPTS,
  CITY_INDEX,
  STATE_FALLBACKS,
  CITIES_LIST,
} from "../data/calculatotdata";

// ─── Formatters ───────────────────────────────────────────────────────────────
const fmtINR = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

const fmtLakh = (n) => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return fmtINR(n);
};

// ─── Tooltip ──────────────────────────────────────────────────────────────────
function InfoTip({ text }) {
  const [v, setV] = useState(false);
  return (
    <span
      className="relative inline-flex items-center cursor-help"
      onMouseEnter={() => setV(true)}
      onMouseLeave={() => setV(false)}
    >
      <MdInfo size={14} className="text-gray-500 ml-1" />
      {v && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 bg-[#1c1c1c] border border-amber-500/30 text-gray-400 text-[11px] px-2.5 py-1.5 rounded-lg whitespace-nowrap z-20">
          {text}
        </span>
      )}
    </span>
  );
}

// ─── Bar Row ──────────────────────────────────────────────────────────────────
function BarRow({ label, value, total, color }) {
  const pct = total > 0 ? Math.min(100, (value / total) * 100) : 0;
  return (
    <div className="mb-2.5">
      <div className="flex justify-between mb-1 text-xs">
        <span className="text-gray-500">{label}</span>
        <span className="text-white font-semibold">{fmtLakh(value)}</span>
      </div>
      <div className="h-1.5 bg-[#1f1f1f] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CalculatorSection({ onScrollTo }) {
  // ── Pricing state (fetched from API) ────────────────────────────────────────
  const [BUILD_TYPES,    setBuildTypes]    = useState({});
  const [FINISH_LEVELS,  setFinishLevels]  = useState({});
  const [PRICING_ADD_ONS, setPricingAddOns] = useState([]);
  const [GST_RATE,       setGstRate]       = useState(0.05);
  const [ARCHITECT_RATE, setArchRate]      = useState(0.06);
  const [CONTINGENCY,    setContingency]   = useState(0.08);
  const [pricingLoaded,  setPricingLoaded] = useState(false);
  const [pricingError,   setPricingError]  = useState(false);

  // ── Calculator input state ──────────────────────────────────────────────────
  const [area,       setArea]      = useState("");
  const [areaUnit,   setAreaUnit]  = useState("sqft");
  const [buildType,  setBuildType] = useState("");
  const [finish,     setFinish]    = useState("Standard");
  const [floorIdx,   setFloorIdx]  = useState(0);
  const [addOns,     setAddOns]    = useState({});
  const [includeGST,       setIncludeGST]       = useState(true);
  const [includeArchitect, setIncludeArchitect] = useState(true);
  const [result, setResult] = useState(null);
  const [error,  setError]  = useState("");

  // ── Location state ──────────────────────────────────────────────────────────
  const [selectedCity,  setSelectedCity]  = useState("Faridabad / NCR");
  const [cityMul,       setCityMul]       = useState(1.40);
  const [detectedLabel, setDetectedLabel] = useState("");
  const [locStatus,     setLocStatus]     = useState("detecting");

  // ── Fetch pricing from API ──────────────────────────────────────────────────
  const fetchPricing = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/pricing");
      if (!res.ok) throw new Error("API error");
      const { pricing } = await res.json();

      const bt = pricing.buildTypes   || {};
      const fl = pricing.finishLevels || {};
      const ao = pricing.addOns       || [];

      setBuildTypes(bt);
      setFinishLevels(fl);
      setPricingAddOns(ao);
      setGstRate((pricing.gstRate      ?? 5)  / 100);
      setArchRate((pricing.archRate    ?? 6)  / 100);
      setContingency((pricing.contingency ?? 8) / 100);

      // Set first buildType if not set yet
      setBuildType((prev) => prev || Object.keys(bt)[0] || "");

      // Sync addOns checkboxes with new add-on list
      setAddOns((prev) => {
        const next = {};
        ao.forEach((a) => { next[a.key] = prev[a.key] ?? false; });
        return next;
      });

      setPricingLoaded(true);
      setPricingError(false);
    } catch {
      setPricingError(true);
      setPricingLoaded(true); // still show calculator with empty/default state
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchPricing();

    // Poll every 30 seconds so dashboard changes reflect quickly
    const interval = setInterval(fetchPricing, 30000);
    return () => clearInterval(interval);
  }, []);

  // ── Location auto-detect ────────────────────────────────────────────────────
  useEffect(() => {
    const detect = async () => {
      try {
        const res  = await fetch("https://ipapi.co/json/");
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        const rawCity  = (data.city   || "").toLowerCase().trim();
        const rawState = (data.region || "").toLowerCase().trim();
        if (CITY_INDEX[rawCity]) {
          const match = CITY_INDEX[rawCity];
          setSelectedCity(match.display);
          setCityMul(match.mul);
          setDetectedLabel(`${data.city}, ${data.region}`);
          setLocStatus("found");
          return;
        }
        if (STATE_FALLBACKS[rawState]) {
          const match = STATE_FALLBACKS[rawState];
          setSelectedCity(match.display);
          setCityMul(match.mul);
          setDetectedLabel(`${data.city} → using ${match.display} rates`);
          setLocStatus("found");
          return;
        }
        setDetectedLabel(`${data.city}, ${data.region}`);
        setLocStatus("manual");
      } catch {
        setLocStatus("failed");
      }
    };
    detect();
  }, []);

  const handleCityChange = (displayName) => {
    const found = CITIES_LIST.find((c) => c.display === displayName);
    if (found) {
      setSelectedCity(found.display);
      setCityMul(found.mul);
      setLocStatus("manual");
      setResult(null);
    }
  };

  const toSqft = (val, unit) => {
    const n = parseFloat(val);
    if (unit === "sqm")  return n * 10.764;
    if (unit === "gaj")  return n * 9;
    return n;
  };

  const toggleAddOn = (key) => {
    setAddOns((p) => ({ ...p, [key]: !p[key] }));
    setResult(null);
  };

  // ── Calculate ───────────────────────────────────────────────────────────────
  const calculate = () => {
    const rawArea = parseFloat(area);
    if (!area || isNaN(rawArea) || rawArea <= 0) {
      setError("Area is required and must be greater than 0.");
      return;
    }
    if (rawArea > 500000) {
      setError("Area seems too large. Please verify.");
      return;
    }
    if (!buildType || !BUILD_TYPES[buildType]) {
      setError("Please select a valid construction type.");
      return;
    }
    setError("");

    const sqftArea  = toSqft(rawArea, areaUnit);
    const baseRate  = BUILD_TYPES[buildType];
    const finishMul = FINISH_LEVELS[finish]?.mul ?? 1;
    const floorSur  = FLOOR_OPTS[floorIdx].sur;
    const baseCost  = sqftArea * baseRate * finishMul * (1 + floorSur) * cityMul;

    const architectFee = includeArchitect ? baseCost * ARCHITECT_RATE : 0;

    let addOnTotal = 0;
    const addOnBreakdown = [];
    PRICING_ADD_ONS.forEach((a) => {
      if (addOns[a.key]) {
        const cost = a.fixed * cityMul;
        addOnTotal += cost;
        addOnBreakdown.push({ label: a.label, cost });
      }
    });

    const subtotal    = baseCost + architectFee + addOnTotal;
    const contingency = subtotal * CONTINGENCY;
    const preTax      = subtotal + contingency;
    const gst         = includeGST ? preTax * GST_RATE : 0;
    const grandTotal  = preTax + gst;

    setResult({
      sqftArea,
      baseCost,
      architectFee,
      addOnTotal,
      addOnBreakdown,
      contingency,
      gst,
      grandTotal,
      perSqft:  grandTotal / sqftArea,
      lowEst:   grandTotal * 0.88,
      highEst:  grandTotal * 1.18,
    });
  };

  const reset = () => {
    setArea("");
    setAreaUnit("sqft");
    setBuildType(Object.keys(BUILD_TYPES)[0] || "");
    setFinish("Standard");
    setFloorIdx(0);
    setAddOns(Object.fromEntries(PRICING_ADD_ONS.map((a) => [a.key, false])));
    setIncludeGST(true);
    setIncludeArchitect(true);
    setResult(null);
    setError("");
  };

  // ─── Location Badge ────────────────────────────────────────────────────────
  const LocBadge = () => {
    if (locStatus === "detecting")
      return (
        <span className="flex items-center gap-1.5 text-[11px] text-gray-500">
          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block animate-pulse" />
          Detecting your location via IP…
        </span>
      );
    if (locStatus === "found")
      return (
        <span className="flex items-center gap-1.5 text-[11px] text-green-500">
          <FaCheckCircle size={11} />
          Auto-detected: <strong className="text-green-400">{detectedLabel}</strong>
        </span>
      );
    if (locStatus === "manual")
      return (
        <span className="flex items-center gap-1.5 text-[11px] text-amber-500">
          <MdMyLocation size={12} />
          {detectedLabel
            ? `Detected: ${detectedLabel} — select closest city below`
            : "Select your city manually"}
        </span>
      );
    return (
      <span className="flex items-center gap-1.5 text-[11px] text-red-500">
        <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
        Location unavailable — please select manually
      </span>
    );
  };

  const inputCls =
    "w-full bg-white/5 border border-white/10 rounded-[10px] px-4 py-3 text-white text-sm outline-none focus:border-amber-500 transition-colors";

  // ── Loading screen ──────────────────────────────────────────────────────────
  if (!pricingLoaded) {
    return (
      <section
        id="calculator"
        className="py-24 px-6 bg-[#111] flex items-center justify-center min-h-[400px]"
      >
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-sm">Loading calculator…</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="calculator"
      className="py-24 px-6 bg-[#111]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(245,158,11,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(245,158,11,0.025) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Header */}
        <span className="block text-[11px] tracking-[0.25em] uppercase text-amber-500 font-semibold mb-3">
          Real Cost Estimator
        </span>
        <h2
          className="text-amber-500 mb-2"
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(40px,6vw,72px)",
          }}
        >
          COST <span className="text-amber-500">CALCULATOR</span>
        </h2>
        <p className="text-gray-600 text-sm mb-9 max-w-xl">
          Your location is auto-detected via{" "}
          <strong className="text-gray-400">ipapi.co</strong> (free API) — city
          cost index applies automatically. You can override anytime.
        </p>
        <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mb-12" />

        {/* API Error Banner */}
        {pricingError && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
            ⚠️ Could not load latest pricing from server — rates may be outdated.{" "}
            <button
              onClick={fetchPricing}
              className="underline hover:text-red-300 cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 items-start">
          {/* ════════ INPUT PANEL ════════ */}
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8">
            {/* Panel Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-[17px] text-white flex items-center gap-2">
                <FaCalculator className="text-amber-500" /> Enter Your Details
              </h3>
              <button
                onClick={reset}
                className="bg-transparent border border-[#2a2a2a] text-gray-600 text-xs px-3 py-1 rounded-md cursor-pointer hover:border-gray-600 hover:text-gray-400 transition-colors"
              >
                Reset
              </button>
            </div>

            {/* Area */}
            <div className="mb-5">
              <label className="text-gray-500 text-[13px] flex items-center mb-1.5">
                Construction Area *
                <InfoTip text="Total built-up area across all floors" />
              </label>
              <div className="flex gap-2 w-full">
                <input
                  className={`${inputCls} w-0 flex-[3] min-w-0`}
                  type="number"
                  min="1"
                  placeholder="e.g. 1200"
                  value={area}
                  onChange={(e) => {
                    setArea(e.target.value);
                    setResult(null);
                    setError("");
                  }}
                />
                <select
                  className={`${inputCls} flex-[1] min-w-0 appearance-none`}
                  style={{ background: "#1a1a1a" }}
                  value={areaUnit}
                  onChange={(e) => {
                    setAreaUnit(e.target.value);
                    setResult(null);
                  }}
                >
                  <option value="sqft">sqft</option>
                  <option value="sqm">sq.m</option>
                  <option value="gaj">Gaj</option>
                </select>
              </div>
              {area &&
                !isNaN(parseFloat(area)) &&
                parseFloat(area) > 0 &&
                (() => {
                  const sf = toSqft(parseFloat(area), areaUnit);
                  return (
                    <div className="text-gray-600 text-xs mt-1.5 flex gap-3.5">
                      <span>{sf.toFixed(0)} sqft</span>
                      <span>{(sf * 0.0929).toFixed(1)} sq.m</span>
                      <span>{(sf / 9).toFixed(1)} Gaj</span>
                    </div>
                  );
                })()}
              {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
            </div>

            {/* Construction Type */}
            <div className="mb-5">
              <label className="text-gray-500 text-[13px] flex items-center mb-1.5">
                Construction Type
                <InfoTip text="Based on CPWD Schedule of Rates 2024" />
              </label>
              {Object.keys(BUILD_TYPES).length === 0 ? (
                <div className="text-gray-600 text-xs py-3 text-center border border-white/10 rounded-[10px]">
                  No construction types configured
                </div>
              ) : (
                <select
                  className={`${inputCls} appearance-none`}
                  style={{ background: "#1a1a1a" }}
                  value={buildType}
                  onChange={(e) => {
                    setBuildType(e.target.value);
                    setResult(null);
                  }}
                >
                  {Object.entries(BUILD_TYPES).map(([k, v]) => (
                    <option key={k} value={k} style={{ background: "#1a1a1a" }}>
                      {k} — ₹{Number(v).toLocaleString("en-IN")}/sqft
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Finish Level */}
            <div className="mb-5">
              <label className="text-gray-500 text-[13px] block mb-2">
                Interior Finish Level
              </label>
              <div className="grid grid-cols-4 gap-2">
                {Object.entries(FINISH_LEVELS).map(([f, { mul }]) => (
                  <button
                    key={f}
                    onClick={() => {
                      setFinish(f);
                      setResult(null);
                    }}
                    className={`rounded-lg text-[13px] font-semibold cursor-pointer py-2.5 px-4 transition-all border text-center ${
                      finish === f
                        ? "bg-gradient-to-br from-amber-500 to-amber-600 text-[#111] border-transparent"
                        : "bg-white/[0.03] border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {f}
                    <div className="text-[10px] opacity-70 mt-0.5">×{mul}</div>
                  </button>
                ))}
              </div>
              <p className="text-gray-600 text-[11px] mt-1.5">
                {FINISH_LEVELS[finish]?.desc || ""}
              </p>
            </div>

            {/* Floors */}
            <div className="mb-5">
              <label className="text-gray-500 text-[13px] flex items-center mb-2">
                Building Height / Floors
                <InfoTip text="More floors = extra structural steel and RCC cost" />
              </label>
              <div className="grid grid-cols-3 gap-2">
                {FLOOR_OPTS.map((f, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setFloorIdx(i);
                      setResult(null);
                    }}
                    className={`rounded-lg text-[13px] font-semibold cursor-pointer py-2.5 px-4 transition-all border text-center ${
                      floorIdx === i
                        ? "bg-gradient-to-br from-amber-500 to-amber-600 text-[#111] border-transparent"
                        : "bg-white/[0.03] border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {f.label}
                    {f.sur > 0 && (
                      <div className="text-[9px] opacity-70 mt-0.5">
                        +{(f.sur * 100).toFixed(0)}%
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="mb-5">
              <label className="text-gray-500 text-[13px] flex items-center mb-1.5">
                <MdLocationOn size={14} className="text-amber-500 mr-1" />
                Project City
                <InfoTip text="Auto-detected from your IP via ipapi.co. Change if project is in a different city." />
              </label>
              <div className="mb-2">
                <LocBadge />
              </div>
              <select
                className={`${inputCls} appearance-none`}
                style={{ background: "#1a1a1a" }}
                value={selectedCity}
                onChange={(e) => handleCityChange(e.target.value)}
              >
                {CITIES_LIST.map((c) => (
                  <option
                    key={c.display}
                    value={c.display}
                    style={{ background: "#1a1a1a" }}
                  >
                    {c.display} (×{c.mul.toFixed(2)})
                  </option>
                ))}
              </select>
              <div className="text-xs text-gray-600 mt-1.5 flex gap-2 items-center">
                <span>Active cost index:</span>
                <span className="text-amber-500 font-bold">
                  ×{cityMul.toFixed(2)}
                </span>
                <span className="text-gray-700">
                  (
                  {cityMul > 1
                    ? `+${((cityMul - 1) * 100).toFixed(0)}% above`
                    : `${((1 - cityMul) * 100).toFixed(0)}% below`}{" "}
                  national avg)
                </span>
              </div>
            </div>

            {/* Add-Ons */}
            {PRICING_ADD_ONS.length > 0 && (
              <div className="mb-5">
                <label className="text-gray-500 text-[13px] block mb-2.5">
                  Optional Add-ons
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PRICING_ADD_ONS.map((a) => (
                    <label
                      key={a.key}
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl cursor-pointer border transition-all ${
                        addOns[a.key]
                          ? "border-amber-500/45 bg-amber-500/[0.07]"
                          : "border-white/[0.07] bg-white/[0.02]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={addOns[a.key] || false}
                        onChange={() => toggleAddOn(a.key)}
                        className="mt-0.5 accent-amber-500"
                      />
                      <div>
                        <div className="text-white text-xs font-semibold">
                          {a.label}
                        </div>
                        <div className="text-gray-600 text-[11px] mt-0.5">
                          {a.note}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Toggles */}
            <div className="flex gap-5 mb-6 flex-wrap">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeArchitect}
                  onChange={(e) => {
                    setIncludeArchitect(e.target.checked);
                    setResult(null);
                  }}
                  className="accent-amber-500"
                />
                <span className="text-gray-500 text-xs">
                  Architect Fees ({Math.round(ARCHITECT_RATE * 100)}%)
                </span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeGST}
                  onChange={(e) => {
                    setIncludeGST(e.target.checked);
                    setResult(null);
                  }}
                  className="accent-amber-500"
                />
                <span className="text-gray-500 text-xs">
                  Include GST ({Math.round(GST_RATE * 100)}%)
                </span>
              </label>
            </div>

            <button
              onClick={calculate}
              className="w-full bg-gradient-to-br from-amber-500 to-amber-600 text-[#111] py-4 rounded-xl font-bold text-[15px] cursor-pointer flex items-center justify-center gap-2 hover:from-amber-400 hover:to-amber-500 transition-all"
            >
              <FaCalculator /> Calculate Construction Cost
            </button>
          </div>

          {/* ════════ RESULT PANEL ════════ */}
          <div className="flex flex-col gap-5">
            {result ? (
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 animate-[fadeUp_0.7s_ease_forwards]">
                <h3 className="font-bold text-[17px] text-white mb-1.5">
                  Your Cost Estimate ✅
                </h3>
                <p className="text-gray-600 text-xs mb-5 leading-relaxed">
                  {result.sqftArea.toFixed(0)} sqft · {buildType} · {finish} ·{" "}
                  {selectedCity} (×{cityMul.toFixed(2)})
                </p>

                {/* Grand Total Hero */}
                <div className="bg-amber-500/[0.07] border border-amber-500/[0.22] rounded-2xl p-5 text-center mb-5">
                  <p className="text-gray-500 text-[13px] mb-1">
                    Total Estimated Cost
                  </p>
                  <p
                    className="text-amber-500 leading-none"
                    style={{
                      fontFamily: "'Bebas Neue', cursive",
                      fontSize: 52,
                    }}
                  >
                    {fmtLakh(result.grandTotal)}
                  </p>
                  <p className="text-gray-500 text-[13px] mt-2">
                    {fmtINR(Math.round(result.perSqft))} per sqft
                  </p>
                </div>

                {/* Visual Bars */}
                <div className="mb-4">
                  <p className="text-gray-600 text-xs mb-2.5">
                    Cost Distribution
                  </p>
                  <BarRow
                    label="Base Construction"
                    value={result.baseCost}
                    total={result.grandTotal}
                    color="#f59e0b"
                  />
                  {result.architectFee > 0 && (
                    <BarRow
                      label={`Architect + Design (${Math.round(ARCHITECT_RATE * 100)}%)`}
                      value={result.architectFee}
                      total={result.grandTotal}
                      color="#d97706"
                    />
                  )}
                  {result.addOnTotal > 0 && (
                    <BarRow
                      label="Add-ons"
                      value={result.addOnTotal}
                      total={result.grandTotal}
                      color="#b45309"
                    />
                  )}
                  <BarRow
                    label={`Contingency (${Math.round(CONTINGENCY * 100)}%)`}
                    value={result.contingency}
                    total={result.grandTotal}
                    color="#92400e"
                  />
                  {result.gst > 0 && (
                    <BarRow
                      label={`GST (${Math.round(GST_RATE * 100)}%)`}
                      value={result.gst}
                      total={result.grandTotal}
                      color="#78350f"
                    />
                  )}
                </div>

                {/* Line Items */}
                <div className="border-t border-white/[0.06] pt-3.5 mb-3.5">
                  {[
                    { label: "Base Construction Cost", val: result.baseCost },
                    ...(result.architectFee > 0
                      ? [
                          {
                            label: `Architect + Design Fees (${Math.round(ARCHITECT_RATE * 100)}%)`,
                            val: result.architectFee,
                          },
                        ]
                      : []),
                    ...result.addOnBreakdown.map((a) => ({
                      label: a.label,
                      val: a.cost,
                    })),
                    {
                      label: `Contingency Reserve (${Math.round(CONTINGENCY * 100)}%)`,
                      val: result.contingency,
                    },
                    ...(result.gst > 0
                      ? [
                          {
                            label: `GST @ ${Math.round(GST_RATE * 100)}%`,
                            val: result.gst,
                          },
                        ]
                      : []),
                  ].map((row, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center py-2.5 border-b border-white/[0.06] text-sm"
                    >
                      <span className="text-gray-500">{row.label}</span>
                      <span className="text-white font-semibold">
                        {fmtLakh(row.val)}
                      </span>
                    </div>
                  ))}

                  {/* Grand Total Row */}
                  <div className="flex justify-between items-center pt-3 border-t border-white/[0.08] mt-1">
                    <span className="text-amber-500 font-bold text-base">
                      Grand Total
                    </span>
                    <div className="text-right">
                      <div className="text-amber-500 font-bold text-[22px]">
                        {fmtLakh(result.grandTotal)}
                      </div>
                      <div className="text-gray-600 text-[11px]">
                        {fmtINR(Math.round(result.grandTotal))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Realistic Range */}
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3 mb-3.5">
                  <p className="text-xs leading-relaxed">
                    <span className="text-gray-400 font-semibold">
                      Realistic Range:{" "}
                    </span>
                    <span className="text-amber-500 font-bold">
                      {fmtLakh(result.lowEst)}
                    </span>
                    <span className="text-gray-600"> – </span>
                    <span className="text-amber-500 font-bold">
                      {fmtLakh(result.highEst)}
                    </span>
                    <br />
                    <span className="text-gray-700">
                      Varies ±12–18% based on contractor, soil type, material
                      brand, and timeline.
                    </span>
                  </p>
                </div>

                {/* Mini Stats */}
                <div className="grid grid-cols-3 gap-2.5 mb-4">
                  {[
                    {
                      label: "Cost / sqft",
                      val: fmtINR(Math.round(result.perSqft)),
                    },
                    {
                      label: "Base Rate",
                      val: `₹${Number(BUILD_TYPES[buildType]).toLocaleString("en-IN")}/sqft`,
                    },
                    {
                      label: "Area",
                      val: `${result.sqftArea.toFixed(0)} sqft`,
                    },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="bg-amber-500/[0.05] border border-amber-500/10 rounded-xl p-2.5 text-center"
                    >
                      <div className="text-amber-500 font-bold text-[13px]">
                        {s.val}
                      </div>
                      <div className="text-gray-600 text-[11px] mt-0.5">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onScrollTo("contact")}
                  className="w-full bg-gradient-to-br from-amber-500 to-amber-600 text-[#111] py-3.5 rounded-xl font-bold text-sm cursor-pointer flex items-center justify-center gap-2 hover:from-amber-400 hover:to-amber-500 transition-all"
                >
                  Get Formal Quote <FaArrowRight />
                </button>
              </div>
            ) : (
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-10 flex flex-col items-center justify-center min-h-[300px] text-center">
                <FaCalculator size={52} className="text-[#222] mb-4" />
                <p className="text-gray-500 text-[15px] leading-relaxed">
                  Enter your{" "}
                  <span className="text-amber-500">area, type & finish</span>
                  <br />
                  then click{" "}
                  <strong className="text-amber-500">Calculate</strong>
                </p>
                <p className="text-[#2a2a2a] text-xs mt-2.5">
                  City rates applied automatically from detected location
                </p>
              </div>
            )}

            {/* Rate Reference */}
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5">
              <h4 className="font-semibold text-white text-[13px] mb-3">
                📋 Current Base Rates (₹/sqft)
              </h4>
              {Object.entries(BUILD_TYPES).length === 0 ? (
                <p className="text-gray-700 text-xs text-center py-2">
                  No rates configured yet.
                </p>
              ) : (
                Object.entries(BUILD_TYPES).map(([k, v]) => (
                  <div
                    key={k}
                    className={`flex justify-between text-xs px-1.5 py-1.5 rounded border-b border-white/[0.04] transition-colors ${
                      buildType === k ? "bg-amber-500/[0.07]" : ""
                    }`}
                  >
                    <span
                      className={
                        buildType === k ? "text-amber-500" : "text-gray-600"
                      }
                    >
                      {buildType === k ? "▶ " : ""}
                      {k}
                    </span>
                    <span
                      className={`font-semibold ${
                        buildType === k ? "text-amber-500" : "text-gray-500"
                      }`}
                    >
                      ₹{Number(v).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))
              )}
              <p className="text-gray-700 text-[11px] mt-2.5 leading-relaxed">
                Source: CPWD 2024, NBO India. Rates updated live from admin
                dashboard. Location cost index via ipapi.co.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe for fadeUp */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}