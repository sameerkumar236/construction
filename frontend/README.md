# 🏗️ BuildCraft – Construction Website

A modern, dark-themed construction company website built with **React + Vite + Tailwind CSS**.

---

## 📁 Project Structure

```
buildcraft/
│
├── index.html
├── package.json
├── vite.config.js
│
└── src/
    ├── main.jsx
    ├── App.jsx
    │
    ├── data/
    │   ├── dummyData.js
    │   ├── servicesData.js
    │   └── calculatorData.js
    │
    ├── components/
    │   ├── Navbar.jsx
    │   ├── HeroSection.jsx
    │   ├── ServicesSection.jsx
    │   ├── ProjectsSection.jsx
    │   ├── CalculatorSection.jsx
    │   ├── WhyUsSection.jsx
    │   ├── TeamSection.jsx
    │   ├── TestimonialsSection.jsx
    │   ├── CTABanner.jsx
    │   ├── ContactSection.jsx
    │   └── Footer.jsx
    │
    ├── Pages/
    │   ├── AuthPage.jsx
    │   └── Dashboard.jsx
    │
    ├── Context/
    │   └── AuthContext.jsx
    │
    └── utils/
        └── api.jsx
        
```

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start dev server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

---

## 🧮 Calculator Features

The **SquareFeet Cost Calculator** supports:

| Input | Options |
|-------|---------|
| Area  | Any sqft value (auto-converts to m²) |
| Construction Type | 9 types (Residential, Commercial, Industrial, Renovation) |
| Finish Level | Economy / Standard / Premium / Luxury |
| Floors | 1 / 2–3 / 4–7 / 8–15 / 16+ |
| Add-ons | Basement, Swimming Pool, Landscaping, Solar Panels |

**Output:**
- Base Construction Cost
- Additional Features Cost
- 8% Contingency Reserve
- **Grand Total + Cost per sqft**

---

## 🎨 Design

- **Theme:** Dark industrial with amber/gold accents
- **Fonts:** Bebas Neue (display) + Inter (body)
- **Icons:** `react-icons` (fa, md families)
- **Dummy Data:** Inline faker-inspired data (no external API needed)
- **Images:** Unsplash CDN + Pravatar (avatars)

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `react` + `react-dom` | UI framework |
| `react-icons` | Icon library |
| `vite` | Fast build tool |
| `tailwindcss` | Utility CSS framework |