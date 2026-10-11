import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { categoryIllustration } from "../utils/helpers";
import VehicleCard from "../components/VehicleCard";
import { useApp } from "../context/VehicleContext";
import Icon from "../components/Icon";

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Buyer",
    text: "The vehicle details and comparison options made it easy to shortlist the right used vehicle.",
  },
  {
    name: "Priya Reddy",
    role: "Buyer",
    text: "A simple marketplace experience with useful filters, favorites and seller contact options.",
  },
  {
    name: "Rahul Kumar",
    role: "Seller",
    text: "Adding a vehicle listing is straightforward and the preview helps before publishing.",
  },
];

export default function Home() {
  const { vehicles } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const featuredVehicles = useMemo(() => vehicles.slice(0, 4), [vehicles]);
  const recentlyAdded = useMemo(
    () => [...vehicles].sort((a, b) => b.year - a.year).slice(0, 4),
    [vehicles]
  );
  const popularBrands = useMemo(() => {
    const counts = {};
    vehicles.forEach((v) => {
      counts[v.brand] = (counts[v.brand] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([brand]) => brand);
  }, [vehicles]);

  const submitSearch = (e) => {
    e.preventDefault();
    const value = search.trim();
    navigate(value ? `/vehicles?search=${encodeURIComponent(value)}` : "/vehicles");
  };

  return (
    <div>
      <section
        className="hero-grid"
        style={{ background: "var(--navy)", color: "#fff" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <p
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5"
              style={{ background: "var(--amber)", color: "var(--navy)" }}
            >
              USED VEHICLE MARKETPLACE
            </p>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl leading-tight">
              Find your next vehicle with confidence.
            </h1>
            <p className="mt-5 text-white/70 text-lg max-w-2xl">
              Browse cars, SUVs, sedans, hatchbacks and bikes from a simple
              demo marketplace.
            </p>

            <form onSubmit={submitSearch} className="mt-8 flex flex-col sm:flex-row gap-2 max-w-2xl">
              <div className="relative flex-1">
                <Icon
                  name="search"
                  className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search brand, model or location..."
                  className="w-full rounded-md py-3 pl-10 pr-3 bg-white text-[var(--text)] outline-none focus-ring"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-3 rounded-md font-bold"
                style={{ background: "var(--amber)", color: "var(--navy)" }}
              >
                Search
              </button>
            </form>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to="/vehicles"
                className="px-5 py-3 rounded-md font-bold border border-white/20 hover:bg-white/10"
              >
                Browse vehicles
              </Link>
              <Link
                to="/sell"
                className="px-5 py-3 rounded-md font-bold border border-white/20 hover:bg-white/10"
              >
                Sell your vehicle
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display font-extrabold text-2xl">Browse by type</h2>
            <p className="text-muted text-sm mt-1">Start with the kind of vehicle you need.</p>
          </div>
          <Link to="/vehicles" className="text-sm font-semibold underline">View all</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {["Car", "SUV", "Sedan", "Hatchback", "Bike"].map((type) => (
            <Link
              key={type}
              to={`/vehicles?type=${type}`}
              className="surface border border-c rounded-lg overflow-hidden plate-tick category-card"
            >
              <div className="category-photo">
                <img src={categoryIllustration(type)} alt={`${type} vehicle`} />
              </div>
              <div className="px-4 py-3 font-bold bg-white">{type}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-4 md:py-8">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display font-extrabold text-2xl">Featured Vehicles</h2>
            <p className="text-muted text-sm mt-1">Selected vehicles currently available in the marketplace.</p>
          </div>
          <Link to="/vehicles" className="text-sm font-semibold underline">View all</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredVehicles.map((vehicle) => <VehicleCard key={vehicle.id} v={vehicle} />)}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display font-extrabold text-2xl">Recently Added</h2>
            <p className="text-muted text-sm mt-1">Explore newer vehicle listings in the marketplace.</p>
          </div>
          <Link to="/vehicles" className="text-sm font-semibold underline">View all</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recentlyAdded.map((vehicle) => <VehicleCard key={vehicle.id} v={vehicle} />)}
        </div>
      </section>

      <section className="surface border-y border-c">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="mb-6">
            <h2 className="font-display font-extrabold text-2xl">Popular Brands</h2>
            <p className="text-muted text-sm mt-1">Browse vehicles by popular brands.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {popularBrands.map((brand) => (
              <Link
                key={brand}
                to={`/vehicles?brand=${encodeURIComponent(brand)}`}
                className="surface2 border border-c rounded-lg px-4 py-4 font-bold hover:border-[var(--amber)]"
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-6">
          <h2 className="font-display font-extrabold text-2xl">Why Choose Us</h2>
          <p className="text-muted text-sm mt-1">Simple tools for buying and selling used vehicles.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            ["search", "Easy vehicle search", "Search, filter and sort vehicles using practical marketplace criteria."],
            ["scale", "Compare vehicles", "Compare selected vehicles side by side before making a decision."],
            ["user", "Simple seller listing", "Sellers can enter vehicle details, add images and publish a listing."],
          ].map(([icon, title, text]) => (
            <div key={title} className="surface border border-c rounded-lg p-6">
              <div className="w-11 h-11 rounded-md flex items-center justify-center mb-4" style={{ background: "var(--amber)", color: "var(--navy)" }}>
                <Icon name={icon} className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="text-muted text-sm mt-2 leading-6">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="surface border-y border-c">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="mb-6">
            <h2 className="font-display font-extrabold text-2xl">Testimonials</h2>
            <p className="text-muted text-sm mt-1">Example feedback for the marketplace experience.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((item) => (
              <article key={item.name} className="border border-c rounded-lg p-6 bg-white">
                <p className="text-sm leading-6">“{item.text}”</p>
                <div className="mt-5">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-xs text-muted mt-1">{item.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="surface border border-c rounded-lg p-7 md:p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <h2 className="font-display font-extrabold text-2xl">Ready to explore?</h2>
            <p className="text-muted mt-1">Browse available vehicles or add your own listing.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/vehicles" className="px-5 py-3 rounded-md font-bold" style={{ background: "var(--navy)", color: "#fff" }}>
              Browse vehicles
            </Link>
            <Link to="/sell" className="px-5 py-3 rounded-md font-bold border border-c">
              Sell your vehicle
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
