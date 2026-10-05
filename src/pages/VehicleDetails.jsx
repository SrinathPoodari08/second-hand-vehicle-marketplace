import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Icon from "../components/Icon";
import { useApp } from "../context/VehicleContext";
import { formatINR, formatKm } from "../utils/helpers";

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    vehicles,
    favoriteVehicles,
    toggleFavorite,
    compareVehicles,
    toggleCompare,
    addEnquiry,
    showToast,
  } = useApp();

  const vehicle = vehicles.find((v) => v.id === id);
  const [imageIndex, setImageIndex] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const [contact, setContact] = useState({ name: "", email: "", phone: "", message: "" });
  const [contactError, setContactError] = useState("");

  if (!vehicle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display font-extrabold text-3xl mb-3">
          Vehicle not found
        </h1>
        <Link to="/vehicles" className="underline font-semibold">
          Back to vehicles
        </Link>
      </div>
    );
  }

  const isFav = favoriteVehicles.includes(vehicle.id);
  const isCompared = compareVehicles.includes(vehicle.id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-muted mb-4">
        <Link to="/" className="underline">Home</Link> <span aria-hidden="true">/</span> <Link to="/vehicles" className="underline">Vehicles</Link> <span aria-hidden="true">/</span> <span>{vehicle.brand} {vehicle.model}</span>
      </nav>
      <button
        onClick={() => navigate(-1)}
        className="text-sm font-semibold underline mb-5"
      >
        ← Back
      </button>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className="surface border border-c rounded-lg overflow-hidden">
            <img
              src={vehicle.images[imageIndex]}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="w-full aspect-[4/3] object-contain bg-white"
            />
            <div className="px-3 py-2 text-xs text-muted border-t border-c">Local second-hand marketplace demo photo</div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-3">
            {vehicle.images.map((image, index) => (
              <button
                key={image}
                onClick={() => setImageIndex(index)}
                className={`border rounded-md overflow-hidden ${
                  index === imageIndex ? "ring-2 ring-offset-2" : ""
                }`}
                style={
                  index === imageIndex
                    ? { borderColor: "var(--amber)" }
                    : { borderColor: "var(--border)" }
                }
              >
                <img
                  src={image}
                  alt=""
                  className="w-full h-24 object-contain bg-white"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <span
            className="inline-block text-xs font-bold px-2 py-1 rounded mb-3"
            style={{ background: "var(--navy)", color: "#fff" }}
          >
            {vehicle.type}
          </span>

          <h1 className="font-display font-extrabold text-3xl">
            {vehicle.brand} {vehicle.model}
          </h1>

          <p className="text-muted mt-1">
            {vehicle.variant} · {vehicle.year}
          </p>

          <p
            className="font-display font-extrabold text-3xl mt-5"
            style={{ color: "var(--amber-dark)" }}
          >
            {formatINR(vehicle.price)}
          </p>

          <div className="grid grid-cols-2 gap-3 mt-6">
            {[
              ["Kilometers", formatKm(vehicle.kilometers)],
              ["Fuel", vehicle.fuel],
              ["Transmission", vehicle.transmission],
              ["Owners", vehicle.owners],
              ["Color", vehicle.color],
              ["Condition", vehicle.condition],
              ["Registration year", vehicle.registrationYear],
              ["Location", vehicle.location],
            ].map(([label, value]) => (
              <div key={label} className="surface2 rounded-md p-3">
                <p className="text-xs text-muted">{label}</p>
                <p className="font-semibold mt-1">{value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => toggleFavorite(vehicle.id)}
              className="px-4 py-3 rounded-md border border-c font-semibold flex items-center gap-2"
            >
              <Icon name={isFav ? "heartFill" : "heart"} />
              {isFav ? "Saved" : "Save"}
            </button>

            <button
              onClick={() => toggleCompare(vehicle.id)}
              className="px-4 py-3 rounded-md font-semibold"
              style={{
                background: isCompared ? "var(--amber)" : "var(--navy)",
                color: isCompared ? "var(--navy)" : "#fff",
              }}
            >
              {isCompared ? "Remove from compare" : "Compare"}
            </button>
          </div>

          <div className="surface border border-c rounded-lg p-5 mt-7">
            <h2 className="font-display font-bold text-lg">Description</h2>
            <p className="text-muted text-sm leading-6 mt-2">
              {vehicle.description}
            </p>

            <h3 className="font-bold mt-5">Features</h3>
            <div className="flex flex-wrap gap-2 mt-3">
              {vehicle.features.map((feature) => (
                <span
                  key={feature}
                  className="text-xs px-3 py-1.5 rounded-full"
                  style={{ background: "var(--surface-2)" }}
                >
                  {feature}
                </span>
              ))}
            </div>

            <div className="mt-5 pt-5 border-t border-c">
              <p className="text-xs text-muted">Seller</p>
              <p className="font-semibold">{vehicle.seller?.name}</p>
              <p className="text-sm text-muted">{vehicle.seller?.location}</p>
            </div>

            <div className="flex flex-wrap gap-3 mt-5">
              <button onClick={() => setContactOpen(true)} className="px-4 py-3 rounded-md font-semibold" style={{ background: "var(--navy)", color: "#fff" }}>Contact Seller</button>
              <button onClick={() => setContactOpen(true)} className="px-4 py-3 rounded-md border border-c font-semibold">Message Seller</button>
              <button onClick={() => { navigator.clipboard?.writeText(window.location.href); showToast("Vehicle link copied", "success"); }} className="px-4 py-3 rounded-md border border-c font-semibold">Share</button>
            </div>

            {contactOpen && (
              <form className="mt-5 pt-5 border-t border-c space-y-4" onSubmit={(e) => {
                e.preventDefault();
                if (!contact.name || !contact.email || !contact.phone || !contact.message) { setContactError("Please complete all contact fields."); return; }
                setContactError("");
                addEnquiry({
                  listingId: vehicle.id,
                  vehicleName: `${vehicle.brand} ${vehicle.model}`,
                  sellerEmail: vehicle.seller?.email || "",
                  buyerName: contact.name,
                  buyerEmail: contact.email,
                  buyerPhone: contact.phone,
                  message: contact.message,
                });
                setContact({ name: "", email: "", phone: "", message: "" });
                setContactOpen(false);
              }}>
                <h3 className="font-bold">Contact seller</h3>
                {[["name","Name","Your name"],["email","Email","you@example.com"],["phone","Phone","10-digit number"]].map(([key,label,placeholder]) => (
                  <div key={key}><label className="block text-sm font-medium mb-1.5">{label}</label><input className="w-full tap px-3 py-2.5 rounded-md border border-c focus-ring outline-none text-sm bg-white" type={key === "email" ? "email" : "text"} value={contact[key]} placeholder={placeholder} onChange={(e) => setContact({ ...contact, [key]: e.target.value })} /></div>
                ))}
                <div><label className="block text-sm font-medium mb-1.5">Message</label><textarea rows="4" className="w-full tap px-3 py-2.5 rounded-md border border-c focus-ring outline-none text-sm bg-white" value={contact.message} onChange={(e) => setContact({ ...contact, message: e.target.value })} placeholder="I am interested in this vehicle..." /></div>
                {contactError && <p className="text-xs" style={{ color: "var(--danger)" }}>{contactError}</p>}
                <button className="px-5 py-3 rounded-md font-bold" style={{ background: "var(--navy)", color: "#fff" }}>Send enquiry</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}