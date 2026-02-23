import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import { CONTACT_INFO } from "../data/dummydata";
import { SERVICES_DATA } from "../data/servicesdata";

const CONTACT_ICONS = [<FaPhone />, <FaEnvelope />, <FaMapMarkerAlt />];

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

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_2bq807n",      // ✅ EmailJS Service ID
        "template_3ha9ljf", 
        form,
       "c-8hwLr3PjK9EbwRX"
      )
      .then(
        () => {
          alert("Message sent successfully!");
          setForm({
            firstName: "",
            lastName: "",
            email: "",
            service: SERVICES_DATA[0].title,
            message: "",
          });
        },
        (error) => {
          alert("Failed to send message.");
          console.error(error);
        }
      );
  };

  const inputCls =
    "w-full bg-white/5 border border-white/10 rounded-[10px] px-4 py-3 text-white text-sm outline-none focus:border-amber-500 transition-colors";

  return (
    <section id="contact" className="py-24 px-6 bg-[#111]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12">

        {/* Left Side */}
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

          <div className="flex flex-col gap-5">
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
        </div>

        {/* Right Side Form */}
        <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8">
          <h3 className="font-semibold text-white text-lg mb-6">
            Send Us a Message
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3.5">
              <input
                className={inputCls}
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={update("firstName")}
                required
              />
              <input
                className={inputCls}
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={update("lastName")}
                required
              />
            </div>

            <input
              className={inputCls}
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={update("email")}
              required
            />

            <select
              className={inputCls}
              name="service"
              value={form.service}
              onChange={update("service")}
            >
              {SERVICES_DATA.map((s) => (
                <option key={s.title}>{s.title}</option>
              ))}
            </select>

            <textarea
              className={`${inputCls} resize-none`}
              rows={4}
              name="message"
              placeholder="Tell us about your project..."
              value={form.message}
              onChange={update("message")}
              required
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-br from-amber-500 to-amber-600 text-[#111] py-4 rounded-xl font-bold text-[15px] flex items-center justify-center gap-2"
            >
              Send Message <FaArrowRight />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}