// ─── Construction Rate Constants (INR) ───────────────────────────────────────
// Source : CPWD Schedule of Rates 2024 + NBO India
// Last Updated : April 2024
// Next Review  : April 2025
// Currency     : INR (₹) per sq.ft
// ─────────────────────────────────────────────────────────────────────────────

// ─── Build Types ─────────────────────────────────────────────────────────────
export const BUILD_TYPES = {
  "Residential – Economy":      1800,
  "Residential – Standard":     2500,
  "Residential – Premium":      3500,
  "Residential – Luxury":       5500,
  "Commercial – Office":        3000,
  "Commercial – Retail/Shop":   2200,
  "Commercial – Mall/Complex":  3800,
  "Industrial – Warehouse":     1200,
  "Industrial – Factory":       1800,
  "Renovation – Partial":        900,
  "Renovation – Full":          1600,
};

// ─── Interior Finish Multipliers ─────────────────────────────────────────────
export const FINISH_LEVELS = {
  "Economy":  { mul: 1.00, desc: "Basic plaster, ceramic tiles, standard fixtures" },
  "Standard": { mul: 1.30, desc: "Vitrified tiles, modular kitchen, good paint" },
  "Premium":  { mul: 1.65, desc: "Imported tiles, premium fittings, false ceiling" },
  "Luxury":   { mul: 2.20, desc: "Italian marble, smart home, designer interiors" },
};

// ─── Floor / Height Surcharge ─────────────────────────────────────────────────
export const FLOOR_OPTS = [
  { label: "G (Ground)", sur: 0.00 },
  { label: "G+1",        sur: 0.04 },
  { label: "G+2",        sur: 0.08 },
  { label: "G+3",        sur: 0.13 },
  { label: "G+4 to G+7",sur: 0.20 },
  { label: "G+8+",       sur: 0.30 },
];

// ─── City Cost Index ──────────────────────────────────────────────────────────
export const CITY_INDEX = {
  "mumbai":        { display: "Mumbai",           mul: 1.55 },
  "delhi":         { display: "Delhi / NCR",      mul: 1.45 },
  "new delhi":     { display: "Delhi / NCR",      mul: 1.45 },
  "bangalore":     { display: "Bangalore",        mul: 1.35 },
  "bengaluru":     { display: "Bangalore",        mul: 1.35 },
  "pune":          { display: "Pune",             mul: 1.25 },
  "hyderabad":     { display: "Hyderabad",        mul: 1.20 },
  "chennai":       { display: "Chennai",          mul: 1.18 },
  "ahmedabad":     { display: "Ahmedabad",        mul: 1.10 },
  "kolkata":       { display: "Kolkata",          mul: 1.08 },
  "jaipur":        { display: "Jaipur",           mul: 1.00 },
  "lucknow":       { display: "Lucknow",          mul: 0.95 },
  "indore":        { display: "Indore",           mul: 0.92 },
  "surat":         { display: "Surat",            mul: 1.05 },
  "faridabad":     { display: "Faridabad / NCR",  mul: 1.40 },
  "gurgaon":       { display: "Gurgaon / NCR",    mul: 1.45 },
  "gurugram":      { display: "Gurgaon / NCR",    mul: 1.45 },
  "noida":         { display: "Noida / NCR",      mul: 1.42 },
  "chandigarh":    { display: "Chandigarh",       mul: 1.12 },
  "bhopal":        { display: "Bhopal",           mul: 0.93 },
  "patna":         { display: "Patna",            mul: 0.90 },
  "nagpur":        { display: "Nagpur",           mul: 1.00 },
  "coimbatore":    { display: "Coimbatore",       mul: 1.05 },
  "kochi":         { display: "Kochi",            mul: 1.10 },
  "visakhapatnam": { display: "Visakhapatnam",    mul: 1.00 },
};

// ─── State Fallbacks (if city not found) ─────────────────────────────────────
export const STATE_FALLBACKS = {
  "maharashtra":    { display: "Mumbai",           mul: 1.55 },
  "karnataka":      { display: "Bangalore",        mul: 1.35 },
  "tamil nadu":     { display: "Chennai",          mul: 1.18 },
  "telangana":      { display: "Hyderabad",        mul: 1.20 },
  "gujarat":        { display: "Ahmedabad",        mul: 1.10 },
  "west bengal":    { display: "Kolkata",          mul: 1.08 },
  "rajasthan":      { display: "Jaipur",           mul: 1.00 },
  "punjab":         { display: "Chandigarh",       mul: 1.12 },
  "haryana":        { display: "Faridabad / NCR",  mul: 1.40 },
  "uttar pradesh":  { display: "Noida / NCR",      mul: 1.42 },
  "madhya pradesh": { display: "Bhopal",           mul: 0.93 },
  "kerala":         { display: "Kochi",            mul: 1.10 },
  "andhra pradesh": { display: "Visakhapatnam",    mul: 1.00 },
  "bihar":          { display: "Patna",            mul: 0.90 },
};

// ─── Cities Dropdown List ─────────────────────────────────────────────────────
export const CITIES_LIST = [
  { display: "Mumbai",           mul: 1.55 },
  { display: "Delhi / NCR",      mul: 1.45 },
  { display: "Gurgaon / NCR",    mul: 1.45 },
  { display: "Noida / NCR",      mul: 1.42 },
  { display: "Faridabad / NCR",  mul: 1.40 },
  { display: "Bangalore",        mul: 1.35 },
  { display: "Pune",             mul: 1.25 },
  { display: "Hyderabad",        mul: 1.20 },
  { display: "Chennai",          mul: 1.18 },
  { display: "Chandigarh",       mul: 1.12 },
  { display: "Kochi",            mul: 1.10 },
  { display: "Ahmedabad",        mul: 1.10 },
  { display: "Kolkata",          mul: 1.08 },
  { display: "Surat",            mul: 1.05 },
  { display: "Coimbatore",       mul: 1.05 },
  { display: "Nagpur",           mul: 1.00 },
  { display: "Jaipur",           mul: 1.00 },
  { display: "Visakhapatnam",    mul: 1.00 },
  { display: "Lucknow",          mul: 0.95 },
  { display: "Bhopal",           mul: 0.93 },
  { display: "Indore",           mul: 0.92 },
  { display: "Patna",            mul: 0.90 },
  { display: "Other / Tier-3",   mul: 0.82 },
];

// ─── Optional Add-ons ─────────────────────────────────────────────────────────
export const ADD_ONS = [
  { key: "parking",   label: "Covered Car Parking",    note: "₹3–4 lakh per slot",     fixed: 350000  },
  { key: "lift",      label: "Passenger Elevator",     note: "~₹8–12 lakh installed",   fixed: 1000000 },
  { key: "solar",     label: "Solar Rooftop (5 kW)",   note: "~₹3–3.5 lakh installed",  fixed: 325000  },
  { key: "rainwater", label: "Rainwater Harvesting",   note: "~₹80K–1.2 lakh",          fixed: 100000  },
  { key: "cctv",      label: "CCTV + Security System", note: "~₹60K–1 lakh",            fixed: 80000   },
  { key: "generator", label: "DG Backup Generator",    note: "~₹4–6 lakh installed",    fixed: 500000  },
];

// ─── Tax & Fee Rates ──────────────────────────────────────────────────────────
export const GST_RATE        = 0.05;   // 5%
export const ARCHITECT_RATE  = 0.06;   // 6%
export const CONTINGENCY     = 0.08;   // 8%

// ─── Meta ─────────────────────────────────────────────────────────────────────
export const RATES_META = {
  version     : "2024-Q1",
  lastUpdated : "April 2024",
  nextReview  : "April 2025",
  source      : "CPWD Schedule of Rates 2024, NBO India",
  currency    : "INR",
};