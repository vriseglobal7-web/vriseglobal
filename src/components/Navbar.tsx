import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Menu } from "lucide-react";
import VriseLogo from "./VriseLogo";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/shows", label: "Our Shows" },
  { to: "/faq", label: "FAQs" },
];

const Navbar = ({ onBook }: { onBook: () => void }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const linkClass = (to: string) => {
    const active = pathname === to;
    return active
      ? "text-secondary-green font-bold border-b-2 border-secondary-green text-sm"
      : "text-gray-600 font-medium text-sm hover:text-secondary-green transition-colors";
  };

  const mobileLinkClass = (to: string) =>
    pathname === to
      ? "text-secondary-green font-bold text-sm"
      : "text-gray-600 font-medium text-sm hover:text-secondary-green transition-colors";

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] glass-nav shadow-sm">
      <div className="w-full px-5 md:max-w-[1440px] md:mx-auto md:px-12 py-1 flex justify-between items-center">
        <Link to="/"><VriseLogo /></Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} className={linkClass(to)}>{label}</Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onBook}
            className="bg-secondary-green text-primary-navy px-4 py-3 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-bold hover:scale-105 transition-all shadow-md"
          >
            Book Now
          </button>
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5 text-primary-navy" /> : <Menu className="w-5 h-5 text-primary-navy" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 shadow-lg">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} className={mobileLinkClass(to)} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <button
            onClick={() => { onBook(); setMenuOpen(false); }}
            className="bg-secondary-green text-primary-navy px-6 py-3 rounded-full text-sm font-bold w-full mt-2"
          >
            Book Now
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
