import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/VehicleContext";
import VehicleCard from "../components/VehicleCard";
import { EmptyState } from "../components/Common";

export default function Dashboard() {
  const {
    userData,
    login,
    logout,
    sellerListings,
    removeListing,
    favoriteVehicles,
    compareVehicles,
    enquiries,
    updateProfile,
  } = useApp();

  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({ name: userData?.name || "", email: userData?.email || "", mobile: userData?.mobile || "", city: userData?.city || "" });

  if (!userData) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="surface border border-c rounded-lg p-8 text-center">
          <h1 className="font-display font-extrabold text-2xl">
            Your dashboard
          </h1>
          <p className="text-muted mt-2 mb-6">
            Log in to see your account and your listings.
          </p>
          <Link
            to="/login"
            className="inline-block px-5 py-3 rounded-md font-bold"
            style={{ background: "var(--navy)", color: "#fff" }}
          >
            Log in
          </Link>
        </div>
      </div>
    );
  }

  const myListings = sellerListings.filter((listing) => !listing.ownerEmail || listing.ownerEmail === userData.email);
  const myEnquiries = enquiries.filter((item) => item.buyerEmail === userData.email || item.sellerEmail === userData.email);

  function saveProfile(e) {
    e.preventDefault();
    if (!profile.name || !profile.email.includes("@")) return;
    updateProfile(profile);
    setEditing(false);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-sm text-muted">Welcome</p>
          <h1 className="font-display font-extrabold text-3xl">
            {userData.name}
          </h1>
          <p className="text-muted mt-1">{userData.email}</p>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2.5 rounded-md border border-c font-semibold"
        >
          Log out
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Stat label="Your listings" value={myListings.length} />
        <Stat label="Account type" value={userData.role || "User"} />
        <Stat label="Favorites" value={favoriteVehicles.length} />
        <Stat label="Compared vehicles" value={compareVehicles.length} />
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Link to="/favorites" className="surface border border-c rounded-lg p-5 hover:shadow-sm"><p className="font-bold">Favorites</p><p className="text-sm text-muted mt-1">View saved vehicles</p></Link>
        <Link to="/compare" className="surface border border-c rounded-lg p-5 hover:shadow-sm"><p className="font-bold">Compared Vehicles</p><p className="text-sm text-muted mt-1">Review vehicles side by side</p></Link>
        <Link to="/contact" className="surface border border-c rounded-lg p-5 hover:shadow-sm"><p className="font-bold">Enquiries</p><p className="text-sm text-muted mt-1">Contact and support</p></Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mb-8">
        <div className="surface border border-c rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-xl">Profile</h2>
            <button onClick={() => setEditing((v) => !v)} className="text-sm font-semibold underline">{editing ? "Cancel" : "Edit Profile"}</button>
          </div>
          {editing ? (
            <form onSubmit={saveProfile} className="space-y-3">
              <input className="w-full tap px-3 py-2.5 rounded-md border border-c outline-none text-sm bg-white" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Full name" />
              <input className="w-full tap px-3 py-2.5 rounded-md border border-c outline-none text-sm bg-white" type="email" value={profile.email} readOnly placeholder="Email" />
              <input className="w-full tap px-3 py-2.5 rounded-md border border-c outline-none text-sm bg-white" value={profile.mobile} onChange={(e) => setProfile({ ...profile, mobile: e.target.value })} placeholder="Mobile number" />
              <input className="w-full tap px-3 py-2.5 rounded-md border border-c outline-none text-sm bg-white" value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} placeholder="City / location" />
              <button className="px-4 py-2.5 rounded-md font-bold" style={{ background: "var(--navy)", color: "#fff" }}>Save profile</button>
            </form>
          ) : (
            <div className="text-sm space-y-1 text-muted">
              <p><span className="font-semibold text-[var(--ink)]">Name:</span> {userData.name}</p>
              <p><span className="font-semibold text-[var(--ink)]">Email:</span> {userData.email || "—"}</p>
              <p><span className="font-semibold text-[var(--ink)]">Mobile:</span> {userData.mobile || "—"}</p>
              <p><span className="font-semibold text-[var(--ink)]">City:</span> {userData.city || "—"}</p>
            </div>
          )}
        </div>
        <div className="surface border border-c rounded-lg p-5">
          <h2 className="font-display font-bold text-xl mb-4">Enquiries</h2>
          {!myEnquiries.length ? <p className="text-sm text-muted">No enquiries yet.</p> : <div className="space-y-3">{myEnquiries.slice(0, 4).map((item) => <div key={item.id} className="border border-c rounded-md p-3"><p className="font-semibold text-sm">{item.vehicleName || "Vehicle enquiry"}</p><p className="text-xs text-muted mt-1">{item.message}</p></div>)}</div>}
        </div>
      </div>

      <div className="surface border border-c rounded-lg p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-bold text-xl">Your listings</h2>
          <Link to="/sell" className="font-semibold underline text-sm">
            Add listing
          </Link>
        </div>

        {!myListings.length ? (
          <EmptyState
            title="No listings yet"
            subtitle="Create your first vehicle listing."
            actionLabel="Sell a vehicle"
            onAction={() => (window.location.href = "/sell")}
          />
        ) : (
          <div className="space-y-3">
            {myListings.map((listing) => (
              <div
                key={listing.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-c rounded-md p-4"
              >
                <div>
                  <p className="font-bold">
                    {listing.brand} {listing.model}
                  </p>
                  <p className="text-sm text-muted">
                    {listing.year} · ₹{Number(listing.price).toLocaleString("en-IN")} · {listing.status}
                  </p>
                </div>

                <button
                  onClick={() => removeListing(listing.id)}
                  className="text-sm font-semibold underline self-start sm:self-auto"
                  style={{ color: "var(--danger)" }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="surface border border-c rounded-lg p-5">
      <p className="text-xs text-muted">{label}</p>
      <p className="font-display font-extrabold text-2xl mt-1">{value}</p>
    </div>
  );
}