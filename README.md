# 🏗️ BuildCraft – Construction Website

A modern, dark-themed construction company website built with **React + Vite + Tailwind CSS**.

---

## 📁 Project Structure

```
buildcraft/
├── index.html                        # HTML entry point
├── package.json                      # Dependencies & scripts
├── vite.config.js                    # Vite bundler config
└── src/
    ├── main.jsx                     # React root mount
    ├── App.jsx                       # Main app – composes all sections
    │
    │
    ├── data/
    │   ├── dummyData.js              # All faker-inspired dummy data (projects, team, testimonials…)
    │   ├── servicesData.js           # Services list
    │   └── calculatorData.js        # Rate tables, multipliers, extras config
    │
    └── components/
        ├── Navbar.jsx                # Sticky navbar with active section highlight
        ├── HeroSection.jsx           # Full-screen hero with stat cards
        ├── ServicesSection.jsx       # 6 service cards with icons
        ├── ProjectsSection.jsx       # 6 project portfolio cards
        ├── CalculatorSection.jsx     # 🧮 SquareFeet → Amount calculator
        ├── WhyUsSection.jsx          # 3 USP highlights
        ├── TeamSection.jsx           # 4 team member cards
        ├── TestimonialsSection.jsx   # 3 client reviews
        ├── CTABanner.jsx             # Gold call-to-action banner
        ├── ContactSection.jsx        # Contact info + message form
        └── Footer.jsx                # Footer with links
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