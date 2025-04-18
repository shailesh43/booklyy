
import { BookOpen, Plus, Info } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import React from "react";

const navLinks = [
  { to: "/", icon: <BookOpen size={20} />, label: "ShelfSpace" },
  { to: "/bookshelf", icon: <BookOpen size={18} />, label: "Bookshelf" },
  { to: "/add", icon: <Plus size={18} />, label: "Add Book" },
  { to: "/about", icon: <Info size={18} />, label: "About" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <nav className="w-full flex justify-between items-center px-4 py-3 mb-6 glass fixed top-0 left-0 z-20">
      <div className="flex items-center gap-4">
        <BookOpen className="text-primary mr-1" size={28} />
        <span className="text-xl font-bold tracking-wide text-primary">ShelfSpace</span>
      </div>
      <div className="flex gap-2 md:gap-6 items-center">
        {navLinks.slice(1).map(link => (
          <Link key={link.to} to={link.to}
            className={`flex items-center gap-1 px-2 py-1 rounded hover:bg-secondary/30 transition font-medium ${
              pathname === link.to ? "text-primary" : "text-foreground"
            }`}
          >
            {link.icon}
            <span className="hidden sm:inline">{link.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
