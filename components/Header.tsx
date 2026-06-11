"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Услуги", href: "#services" },
    { label: "О нас", href: "#about" },
    { label: "Портфолио", href: "#portfolio" },
    { label: "Отзывы", href: "#testimonials" },
    { label: "Контакты", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/98 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg gradient-orange flex items-center justify-center shadow-lg">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div>
              <div
                className="text-white font-black text-xl leading-none tracking-wide"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                КомСтрой
                <span className="text-orange-400">74</span>
              </div>
              <div className="text-slate-400 text-xs tracking-widest uppercase leading-none mt-0.5">
                Челябинск
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-orange-400 transition-colors duration-200 text-sm font-medium tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+73512000000"
              className="text-white font-bold text-sm hover:text-orange-400 transition-colors"
            >
              +7 (351) 200-00-00
            </a>
            <a href="#contact" className="btn-primary text-sm py-3 px-6">
              Бесплатная смета
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            {menuOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-700 pb-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-slate-300 hover:text-orange-400 text-sm font-medium border-b border-slate-800"
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 pt-4 flex flex-col gap-3">
              <a
                href="tel:+73512000000"
                className="text-white font-bold text-center"
              >
                +7 (351) 200-00-00
              </a>
              <a href="#contact" className="btn-primary text-center justify-center">
                Бесплатная смета
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
