// ─── Calculator Constants ─────────────────────────────────────────────────────

export const RATE_TABLE = {
  "Residential – Basic": 95,
  "Residential – Premium": 150,
  "Residential – Luxury": 220,
  "Commercial – Standard": 85,
  "Commercial – High-End": 135,
  "Industrial – Warehouse": 55,
  "Industrial – Factory": 75,
  "Renovation – Basic": 45,
  "Renovation – Full": 90,
};

export const FINISH_MULTIPLIER = {
  Economy: 1.0,
  Standard: 1.25,
  Premium: 1.55,
  Luxury: 2.0,
};

export const FLOOR_SURCHARGE = {
  "1": 0,
  "2–3": 0.05,
  "4–7": 0.1,
  "8–15": 0.18,
  "16+": 0.28,
};

export const EXTRAS_CONFIG = [
  { key: "basement",    label: "Basement",       note: "+40% base" },
  { key: "pool",        label: "Swimming Pool",  note: "+$45,000"  },
  { key: "landscaping", label: "Landscaping",    note: "+$20/sqft" },
  { key: "solar",       label: "Solar Panels",   note: "+$15,000"  },
];

export const CONTINGENCY_RATE = 0.08;