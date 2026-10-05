import { Link } from "react-router-dom";
import VehicleCard from "../components/VehicleCard";
import { EmptyState } from "../components/Common";
import { useApp } from "../context/VehicleContext";
import { formatINR, formatKm } from "../utils/helpers";

export function Favorites() {
  const { vehicles, favoriteVehicles } = useApp();
  const items = vehicles.filter((v) => favoriteVehicles.includes(v.id));

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-display font-extrabold text-3xl">Favorites</h1>
      <p className="text-muted mt-1 mb-7">
        Vehicles you have saved in this browser.
      </p>

      {items.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((vehicle) => (
            <VehicleCard key={vehicle.id} v={vehicle} />
          ))}
        </div>
      ) : (
        <div className="surface border border-c rounded-lg">
          <EmptyState
            title="No favorites yet"
            subtitle="Tap the heart icon on a vehicle to save it here."
            actionLabel="Browse vehicles"
            onAction={() => (window.location.href = "/vehicles")}
          />
        </div>
      )}
    </div>
  );
}

export function Compare() {
  const { vehicles, compareVehicles, toggleCompare } = useApp();
  const items = vehicles.filter((v) => compareVehicles.includes(v.id));

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-display font-extrabold text-3xl">Compare vehicles</h1>
      <p className="text-muted mt-1 mb-7">
        Compare up to four vehicles side by side.
      </p>

      {!items.length ? (
        <div className="surface border border-c rounded-lg">
          <EmptyState
            title="Nothing to compare"
            subtitle="Add vehicles using the compare button."
            actionLabel="Browse vehicles"
            onAction={() => (window.location.href = "/vehicles")}
          />
        </div>
      ) : (
        <div className="overflow-x-auto surface border border-c rounded-lg">
          <table className="w-full text-sm min-w-[760px]">
            <thead>
              <tr className="border-b border-c">
                <th className="text-left p-4 bg-[var(--surface-2)]">Vehicle</th>
                {items.map((v) => (
                  <th key={v.id} className="text-left p-4">
                    {v.brand} {v.model}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Price", (v) => formatINR(v.price)],
                ["Year", (v) => v.year],
                ["Kilometers", (v) => formatKm(v.kilometers)],
                ["Fuel", (v) => v.fuel],
                ["Transmission", (v) => v.transmission],
                ["Location", (v) => v.location],
                ["Condition", (v) => v.condition],
              ].map(([label, getValue]) => (
                <tr key={label} className="border-b border-c last:border-b-0">
                  <td className="p-4 font-semibold bg-[var(--surface-2)]">{label}</td>
                  {items.map((v) => (
                    <td key={v.id} className="p-4">{getValue(v)}</td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="p-4 bg-[var(--surface-2)]" />
                {items.map((v) => (
                  <td key={v.id} className="p-4">
                    <button
                      onClick={() => toggleCompare(v.id)}
                      className="text-sm font-semibold underline"
                    >
                      Remove
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}