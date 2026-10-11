import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import VehicleCard from "../components/VehicleCard";
import FilterSidebar from "../components/FilterSidebar";
import Modal from "../components/Modal";
import { EmptyState, Pagination } from "../components/Common";
import Icon from "../components/Icon";
import { useApp } from "../context/VehicleContext";

const initialFilters = {
  type: "",
  brand: "",
  min: "",
  max: "",
  fuel: "",
  transmission: "",
  year: "",
  location: "",
};

export default function Vehicles() {
  const { vehicles } = useApp();
  const [params] = useSearchParams();
  const [filters, setFilters] = useState({
    ...initialFilters,
    type: params.get("type") || "",
    brand: params.get("brand") || "",
  });
  const [search, setSearch] = useState(params.get("search") || "");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [mobileFilters, setMobileFilters] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [filters, search, sort]);

  const brands = useMemo(
    () => [...new Set(vehicles.map((v) => v.brand))].sort(),
    [vehicles]
  );

  const locations = useMemo(
    () => [...new Set(vehicles.map((v) => v.location))].sort(),
    [vehicles]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    const result = vehicles.filter((v) => {
      const searchable = `${v.brand} ${v.model} ${v.variant} ${v.type} ${v.location}`.toLowerCase();

      if (q && !searchable.includes(q)) return false;
      if (filters.type && v.type !== filters.type) return false;
      if (filters.brand && v.brand !== filters.brand) return false;
      if (filters.fuel && v.fuel !== filters.fuel) return false;
      if (filters.transmission && v.transmission !== filters.transmission) return false;
      if (filters.location && v.location !== filters.location) return false;
      if (filters.year === "older" && v.year >= 2022) return false;
      if (filters.year && filters.year !== "older" && v.year < Number(filters.year)) return false;
      if (filters.min && v.price < Number(filters.min)) return false;
      if (filters.max && v.price > Number(filters.max)) return false;

      return true;
    });

    return [...result].sort((a, b) => {
      if (sort === "priceLow") return a.price - b.price;
      if (sort === "priceHigh") return b.price - a.price;
      if (sort === "kmLow") return a.kilometers - b.kilometers;
      if (sort === "kmHigh") return b.kilometers - a.kilometers;
      if (sort === "oldest") return a.year - b.year;
      return b.year - a.year;
    });
  }, [vehicles, filters, search, sort]);

  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-7">
        <h1 className="font-display font-extrabold text-3xl">Browse vehicles</h1>
        <p className="text-muted mt-1">
          Search and filter vehicles currently available in the marketplace.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-7">
        <aside className="hidden lg:block lg:w-64 shrink-0 surface border border-c rounded-lg p-5 h-fit">
          <h2 className="font-bold mb-5">Filters</h2>
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            brands={brands}
            locations={locations}
          />
        </aside>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <Icon
                name="search"
                className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                className="w-full border border-c rounded-md py-3 pl-10 pr-3 outline-none focus-ring bg-white"
                placeholder="Search brand, model or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button
              className="lg:hidden border border-c rounded-md px-4 py-3 font-semibold flex items-center justify-center gap-2 bg-white"
              onClick={() => setMobileFilters(true)}
            >
              <Icon name="filter" className="w-5 h-5" />
              Filters
            </button>

            <select
              className="border border-c rounded-md px-3 py-3 bg-white outline-none focus-ring"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="priceLow">Price: low to high</option>
              <option value="priceHigh">Price: high to low</option>
              <option value="kmLow">Lowest km</option>
              <option value="kmHigh">Highest km</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>

          <p className="text-sm text-muted mb-4">
            {filtered.length} vehicle{filtered.length !== 1 ? "s" : ""} found
          </p>

          {currentItems.length ? (
            <>
              <div className="grid sm:grid-cols-2 gap-5">
                {currentItems.map((vehicle) => (
                  <VehicleCard key={vehicle.id} v={vehicle} />
                ))}
              </div>
              <Pagination
                page={page}
                totalPages={totalPages}
                onChange={setPage}
              />
            </>
          ) : (
            <div className="surface border border-c rounded-lg">
              <EmptyState
                title="No vehicles found"
                subtitle="Try changing your search or clearing some filters."
                actionLabel="Clear filters"
                onAction={() => {
                  setFilters(initialFilters);
                  setSearch("");
                }}
              />
            </div>
          )}
        </div>
      </div>

      <Modal
        open={mobileFilters}
        onClose={() => setMobileFilters(false)}
        title="Filters"
      >
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          brands={brands}
          locations={locations}
        />
        <button
          onClick={() => setMobileFilters(false)}
          className="w-full mt-6 py-3 rounded-md font-bold"
          style={{ background: "var(--navy)", color: "#fff" }}
        >
          Apply filters
        </button>
      </Modal>
    </div>
  );
}