import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "./Icon";
import { useApp } from "../context/VehicleContext";

function NavLink({ to, children, current }) {
  const active = current === to || (to !== "/" && current.startsWith(to));

  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active ? "" : "hover:bg-white/10"
      }`}
      style={
        active
          ? { background: "var(--amber)", color: "var(--navy)" }
          : { color: "#fff" }
      }
    >
      {children}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { userData, favoriteVehicles, compareVehicles } = useApp();
  const { pathname } = useLocation();

  const links = [
    ["/", "Home"],
    ["/vehicles", "Browse"],
    ["/sell", "Sell"],
    ["/favorites", "Favorites"],
    ["/compare", "Compare"],
    ["/contact", "Contact"],
  ];

  return (
    <header
      className="sticky top-0 z-50"
      style={{ background: "var(--navy)" }}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 font-display font-extrabold text-xl text-white"
          aria-label="Milestone home"
        >
          <span
            className="w-8 h-8 rounded-md flex items-center justify-center"
            style={{ background: "var(--amber)", color: "var(--navy)" }}
          >
            M
          </span>
          Milestone
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} current={pathname}>
              <span className="relative">
                {label}
                {to === "/favorites" && favoriteVehicles.length > 0 && (
                  <sup className="ml-1">{favoriteVehicles.length}</sup>
                )}
                {to === "/compare" && compareVehicles.length > 0 && (
                  <sup className="ml-1">{compareVehicles.length}</sup>
                )}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/dashboard"
            className="tap px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white/10 flex items-center gap-1.5"
          >
            <Icon name="user" className="w-4 h-4" />
            {userData ? userData.name.split(" ")[0] : "Account"}
          </Link>

          {!userData && (
            <Link
              to="/login"
              className="tap px-4 py-2 rounded-md text-sm font-semibold"
              style={{ background: "var(--amber)", color: "var(--navy)" }}
            >
              Log in
            </Link>
          )}
        </div>

        <button
          className="md:hidden tap w-11 h-11 flex items-center justify-center text-white"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Icon name="menu" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[95] md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          <div
            className="absolute right-0 top-0 h-full w-72"
            style={{ background: "var(--navy)" }}
          >
            <div className="flex justify-end p-4">
              <button
                className="tap w-11 h-11 flex items-center justify-center text-white"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <Icon name="close" />
              </button>
            </div>

            <nav className="flex flex-col gap-1 px-4" aria-label="Mobile">
              {links.map(([to, label]) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className="tap flex items-center px-3 py-3 rounded-md text-white font-medium hover:bg-white/10"
                >
                  {label}
                </Link>
              ))}

              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="tap flex items-center px-3 py-3 rounded-md text-white font-medium hover:bg-white/10"
              >
                Dashboard
              </Link>

              {!userData && (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="tap mt-2 flex items-center justify-center px-3 py-3 rounded-md font-semibold"
                  style={{ background: "var(--amber)", color: "var(--navy)" }}
                >
                  Log in
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer
      className="mt-16"
      style={{ background: "var(--navy)", color: "#fff" }}
    >
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display font-extrabold text-xl mb-2 flex items-center gap-2">
            <span
              className="w-7 h-7 rounded-md flex items-center justify-center text-sm"
              style={{ background: "var(--amber)", color: "var(--navy)" }}
            >
              M
            </span>
            Milestone
          </div>
          <p className="text-sm text-white/60">
            Every good vehicle deserves a second driver.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm">Marketplace</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/vehicles" className="hover:text-white">Browse vehicles</Link></li>
            <li><Link to="/sell" className="hover:text-white">Sell your vehicle</Link></li>
            <li><Link to="/compare" className="hover:text-white">Compare</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm">Account</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/login" className="hover:text-white">Log in</Link></li>
            <li><Link to="/register" className="hover:text-white">Create account</Link></li>
            <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm">Support</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/contact" className="hover:text-white">Contact us</Link></li>
            <li><Link to="/vehicles" className="hover:text-white">Help finding a vehicle</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        This is a demo marketplace with no real listings, payments, or accounts.
        All data is stored locally in your browser.
      </div>
    </footer>
  );
}