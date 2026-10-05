import { Link } from "react-router-dom";
import Icon from "./Icon";
import { formatINR, formatKm } from "../utils/helpers";
import { useApp } from "../context/VehicleContext";

export default function VehicleCard({ v }) {
  const {
    favoriteVehicles,
    toggleFavorite,
    compareVehicles,
    toggleCompare,
  } = useApp();

  const isFav = favoriteVehicles.includes(v.id);
  const isCompared = compareVehicles.includes(v.id);

  return (
    <div className="surface border border-c rounded-lg overflow-hidden flex flex-col plate-tick group">
      <div className="relative">
        <Link to={`/vehicles/${v.id}`}>
          <img
            src={v.images[0]}
            alt={`${v.brand} ${v.model} ${v.variant}`}
            loading="lazy"
            className="w-full h-44 object-contain bg-white p-2"
          />
          
        </Link>

        <button
          onClick={() => toggleFavorite(v.id)}
          aria-pressed={isFav}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          className="tap absolute top-2 right-2 w-10 h-10 rounded-full flex items-center justify-center bg-white/90 shadow focus-ring"
        >
          <Icon
            name={isFav ? "heartFill" : "heart"}
            className="w-5 h-5"
            style={{ color: isFav ? "var(--danger)" : "#333" }}
          />
        </button>

        <span
          className="absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded"
          style={{ background: "var(--navy)", color: "#fff" }}
        >
          {v.type}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display font-bold leading-tight">
              {v.brand} {v.model}
            </h3>
            <p className="text-xs text-muted">
              {v.variant} · {v.year}
            </p>
          </div>

          <p
            className="font-display font-extrabold whitespace-nowrap"
            style={{ color: "var(--amber-dark)" }}
          >
            {formatINR(v.price)}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
          <span>{formatKm(v.kilometers)}</span>
          <span>·</span>
          <span>{v.fuel}</span>
          <span>·</span>
          <span>{v.transmission}</span>
        </div>

        <div className="flex items-center gap-1 text-xs text-muted">
          <Icon name="pin" className="w-3.5 h-3.5" />
          {v.location}
        </div>

        <div className="mt-auto pt-3 flex gap-2">
          <Link
            to={`/vehicles/${v.id}`}
            className="tap flex-1 text-center px-3 py-2 rounded-md text-sm font-semibold"
            style={{ background: "var(--navy)", color: "#fff" }}
          >
            View details
          </Link>

          <button
            onClick={() => toggleCompare(v.id)}
            aria-pressed={isCompared}
            className="tap w-11 h-11 shrink-0 flex items-center justify-center rounded-md border border-c focus-ring"
            style={
              isCompared
                ? {
                    background: "var(--amber)",
                    borderColor: "var(--amber)",
                    color: "var(--navy)",
                  }
                : {}
            }
            aria-label={isCompared ? "Remove from compare" : "Add to compare"}
          >
            <Icon name="scale" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}