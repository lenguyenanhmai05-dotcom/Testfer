"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
        scrolled ? "glass py-3" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gradient">
          NEXTER
        </Link>
        
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link href="#" className="hover:text-brand-primary transition-colors">Features</Link>
          <Link href="#" className="hover:text-brand-primary transition-colors">Services</Link>
          <Link href="#" className="hover:text-brand-primary transition-colors">About</Link>
          <Link href="#" className="hover:text-brand-primary transition-colors">Contact</Link>
        </div>

        <button className="px-5 py-2 rounded-full glass-card hover:bg-white/10 transition-all text-sm font-semibold">
          Get Started
        </button>
      </div>
    </nav>
  );
}
