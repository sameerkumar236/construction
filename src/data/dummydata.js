// ─── Faker-inspired Dummy Data ───────────────────────────────────────────────

export const PROJECTS = [
  {
    id: 1,
    title: "Skyline Business Hub",
    location: "Bandra Kurla Complex, Mumbai",
    area: 52000,
    type: "Commercial",
    year: 2024,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1599423300746-b62533397364?w=600&q=80", // Mumbai skyline vibe
    status: "Completed",
  },
  {
    id: 2,
    title: "Green Haven Residency",
    location: "Gurugram, Haryana",
    area: 35000,
    type: "Residential",
    year: 2024,
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", // modern apartment india vibe
    status: "Completed",
  },
  {
    id: 3,
    title: "Eastern Express Flyover Upgrade",
    location: "Kolkata, West Bengal",
    area: 18000,
    type: "Infrastructure",
    year: 2023,
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=80", // bridge / flyover vibe
    status: "Completed",
  },
  {
    id: 4,
    title: "Phoenix Mall Extension",
    location: "Pune, Maharashtra",
    area: 70000,
    type: "Commercial",
    year: 2025,
    rating: 4.6,
    img: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=600&q=80", // shopping mall interior
    status: "Ongoing",
  },
  {
    id: 5,
    title: "Lakeview Premium Villas",
    location: "Whitefield, Bengaluru",
    area: 30000,
    type: "Residential",
    year: 2025,
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1763226950354-b04f6101acd1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bHV4dXJ5JTIwdmlsbGElMjB2aWV3fGVufDB8fDB8fHww", // luxury villas vibe
    status: "Ongoing",
  },
  {
    id: 6,
    title: "IT Techno Park Phase II",
    location: "HITEC City, Hyderabad",
    area: 76000,
    type: "Commercial",
    year: 2025,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80", // IT park / glass office building
    status: "Ongoing",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Robert Harrington",
    role: "CEO, Harrington Realty",
    text: "BuildCraft transformed our vision into reality. Their attention to detail and professionalism is unmatched in the industry.",
    avatar: "https://i.pravatar.cc/80?img=11",
    rating: 5,
  },
  {
    id: 2,
    name: "Sandra Mitchell",
    role: "Property Developer",
    text: "We've worked with many contractors, but BuildCraft stands out for their punctuality, quality and transparent pricing.",
    avatar: "https://i.pravatar.cc/80?img=47",
    rating: 5,
  },
  {
    id: 3,
    name: "James Okafor",
    role: "City Planner, NYC",
    text: "Outstanding infrastructure work. The Harbor Bridge project was completed ahead of schedule and under budget.",
    avatar: "https://i.pravatar.cc/80?img=15",
    rating: 5,
  },
];

export const TEAM = [
  {
    name: "Ansh Mishra",
    role: "Chief Architect",
    exp: "10 yrs",
    avatar: "https://thumbs.dreamstime.com/b/serious-indian-professional-business-man-office-portrait-serious-young-ambitious-indian-businessman-project-leader-dressed-367980912.jpg",
  },
  {
    name: "Sam Malhotra",
    role: "Project Manager",
    exp: "5 yrs",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeSpB8TYfve4DNJC_Lt3qMwjzGOrZXMeg0ZA&s",
  },
  {
    name: "Ritik Sharma",
    role: "Structural Engineer",
    exp: "8 yrs",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFMv3xXUWQ_UymielHwEcjmvimnByuE_ohtw&s",
  },
  {
    name: "Priya Sharma",
    role: "Interior Designer",
    exp: "10 yrs",
    avatar: "https://i.pravatar.cc/120?img=44",
  },
];

export const STATS = [
  { n: "350+", l: "Projects Done" },
  { n: "26 yrs", l: "Experience" },
  { n: "98%", l: "Client Satisfaction" },
  { n: "$2.4B", l: "Value Delivered" },
];

export const WHY_US = [
  {
    title: "On-Time Delivery",
    text: "97% of our projects are delivered on schedule using rigorous milestone planning.",
  },
  {
    title: "Award-Winning Quality",
    text: "Recipient of ACCA Gold Award 5 consecutive years for construction excellence.",
  },
  {
    title: "Safety First",
    text: "Zero fatal incidents in 8 years. ISO 45001 certified safety management systems.",
  },
];

export const CONTACT_INFO = [
  { label: "Phone", value: "+1 (800) 555-0182" },
  { label: "Email", value: "rajpandey8202@gmail.com" },
  { label: "Address", value: "Mahavir enclave dasrathpuri dwarka" },
];

export const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "Projects", id: "projects" },
  { label: "Calculator", id: "calculator" },
  { label: "Team", id: "team" },
  { label: "Contact", id: "contact" },
];