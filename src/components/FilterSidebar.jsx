import { Label, inputCls } from "./Common";

export default function FilterSidebar({
  filters,
  setFilters,
  brands,
  locations,
}) {
  function set(key, value) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Label>Vehicle type</Label>
        <div className="flex flex-wrap gap-2">
          {["", "Car", "SUV", "Sedan", "Hatchback", "Bike"].map((type) => (
            <button
              key={type || "all"}
              onClick={() => set("type", type)}
              className="tap px-3 py-1.5 rounded-full border text-xs font-medium border-c"
              style={
                filters.type === type
                  ? {
                      background: "var(--navy)",
                      color: "#fff",
                      borderColor: "var(--navy)",
                    }
                  : {}
              }
            >
              {type || "All"}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label>Brand</Label>
        <select
          className={inputCls}
          value={filters.brand}
          onChange={(e) => set("brand", e.target.value)}
        >
          <option value="">All brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label>Price range (₹)</Label>
        <div className="flex gap-2">
          <input
            type="number"
            min="0"
            placeholder="Min"
            className={inputCls}
            value={filters.min}
            onChange={(e) => set("min", e.target.value)}
          />
          <input
            type="number"
            min="0"
            placeholder="Max"
            className={inputCls}
            value={filters.max}
            onChange={(e) => set("max", e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label>Fuel type</Label>
        <select
          className={inputCls}
          value={filters.fuel}
          onChange={(e) => set("fuel", e.target.value)}
        >
          <option value="">Any fuel</option>
          {["Petrol", "Diesel", "CNG", "Electric", "Hybrid"].map((fuel) => (
            <option key={fuel} value={fuel}>
              {fuel}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label>Transmission</Label>
        <select
          className={inputCls}
          value={filters.transmission}
          onChange={(e) => set("transmission", e.target.value)}
        >
          <option value="">Any</option>
          <option>Manual</option>
          <option>Automatic</option>
        </select>
      </div>

      <div>
        <Label>Year (min)</Label>
        <select
          className={inputCls}
          value={filters.year}
          onChange={(e) => set("year", e.target.value)}
        >
          <option value="">Any year</option>
          {[2022, 2023, 2024, 2025, 2026].map((year) => (
            <option key={year} value={year}>
              {year}+
            </option>
          ))}
          <option value="older">Older</option>
        </select>
      </div>

      <div>
        <Label>Location</Label>
        <select
          className={inputCls}
          value={filters.location}
          onChange={(e) => set("location", e.target.value)}
        >
          <option value="">All locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() =>
          setFilters({
            type: "",
            brand: "",
            min: "",
            max: "",
            fuel: "",
            transmission: "",
            year: "",
            location: "",
          })
        }
        className="tap text-sm font-semibold underline self-start"
      >
        Clear all filters
      </button>
    </div>
  );
}