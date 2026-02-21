import { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { CONTACT_INFO } from "../data/dummydata";
import { SERVICES_DATA } from "../data/servicesdata";

const CONTACT_ICONS = [<FaPhone />, <FaEnvelope />, <FaMapMarkerAlt />];
const SOCIAL_ICONS  = [FaFacebook, FaTwitter, FaInstagram, FaLinkedin];

export default function ContactSection() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    service: SERVICES_DATA[0].title,
    message: "",
  });

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = () => {
    alert("Message sent! We'll get back to you shortly.");
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      service: SERVICES_DATA[0].title,
      message: "",
    });
  };

  // Shared input/select/textarea class
  const inputCls =
    "w-full bg-white/5 border border-white/10 rounded-[10px] px-4 py-3 text-white text-sm outline-none focus:border-amber-500 transition-colors";

  return (
    <section id="contact" className="py-24 px-6 bg-[#111]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12">

        {/* ── Left – Info ── */}
        <div>
          <span className="block text-[11px] tracking-[0.25em] uppercase text-amber-500 font-semibold mb-3">
            Get In Touch
          </span>
          <h2
            className="text-white mb-2"
            style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(40px,6vw,72px)" }}
          >
            CONTACT <span className="text-amber-500">US</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mb-10" />

          {/* Contact Items */}
          <div className="flex flex-col gap-5 mb-8">
            {CONTACT_INFO.map((c, i) => (
              <div key={i} className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-[#111] shrink-0">
                  {CONTACT_ICONS[i]}
                </div>
                <div>
                  <p className="text-gray-600 text-xs">{c.label}</p>
                  <p className="text-white text-sm font-medium">{c.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex gap-2.5">
            {SOCIAL_ICONS.map((Icon, i) => (
              <div
                key={i}
                className="w-[38px] h-[38px] rounded-[10px] bg-white/[0.03] border border-white/[0.07] flex items-center justify-center cursor-pointer text-gray-600 hover:text-amber-500 transition-colors"
              >
                <Icon size={15} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Right – Form ── */}
        <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8">
          <h3 className="font-semibold text-white text-lg mb-6">
            Send Us a Message
          </h3>

          <div className="flex flex-col gap-4">
            {/* Name Row */}
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="text-gray-500 text-xs block mb-1.5">First Name</label>
                <input
                  className={inputCls}
                  placeholder="Marcus"
                  value={form.firstName}
                  onChange={update("firstName")}
                />
              </div>
              <div>
                <label className="text-gray-500 text-xs block mb-1.5">Last Name</label>
                <input
                  className={inputCls}
                  placeholder="Donovan"
                  value={form.lastName}
                  onChange={update("lastName")}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-500 text-xs block mb-1.5">Email</label>
              <input
                className={inputCls}
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={update("email")}
              />
            </div>

            {/* Service */}
            <div>
              <label className="text-gray-500 text-xs block mb-1.5">Service</label>
              <select
                className={inputCls}
                style={{ background: "#1a1a1a" }}
                value={form.service}
                onChange={update("service")}
              >
                {SERVICES_DATA.map((s) => (
                  <option key={s.title} style={{ background: "#1a1a1a" }}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="text-gray-500 text-xs block mb-1.5">Message</label>
              <textarea
                className={`${inputCls} resize-none`}
                rows={4}
                placeholder="Tell us about your project..."
                value={form.message}
                onChange={update("message")}
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-br from-amber-500 to-amber-600 text-[#111] py-4 rounded-xl font-bold text-[15px] cursor-pointer flex items-center justify-center gap-2 hover:from-amber-400 hover:to-amber-500 transition-all border-none"
            >
              Send Message <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}