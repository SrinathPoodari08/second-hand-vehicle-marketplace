import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { makeImages } from "../utils/helpers";
import baseVehicles from "../data/vehicles.json";

const VehicleContext = createContext(null);

export function useApp() {
  const ctx = useContext(VehicleContext);
  if (!ctx) {
    throw new Error("useApp must be used within a VehicleProvider");
  }
  return ctx;
}

export function VehicleProvider({ children }) {
  const [favoriteVehicles, setFavoriteVehicles] = useLocalStorage("favoriteVehicles", []);
  const [compareVehicles, setCompareVehicles] = useLocalStorage("compareVehicles", []);
  const [userData, setUserData] = useLocalStorage("userData", null);
  const [sellerListings, setSellerListings] = useLocalStorage("sellerListings", []);
  const [enquiries, setEnquiries] = useLocalStorage("enquiries", []);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, id: Date.now() });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const toggleFavorite = useCallback(
    (id) => {
      setFavoriteVehicles((prev) => {
        const has = prev.includes(id);
        showToast(
          has ? "Removed from favorites" : "Added to favorites",
          has ? "info" : "success"
        );
        return has ? prev.filter((x) => x !== id) : [...prev, id];
      });
    },
    [setFavoriteVehicles, showToast]
  );

  const toggleCompare = useCallback(
    (id) => {
      setCompareVehicles((prev) => {
        if (prev.includes(id)) {
          showToast("Removed from compare", "info");
          return prev.filter((x) => x !== id);
        }

        if (prev.length >= 4) {
          showToast("You can compare up to 4 vehicles", "error");
          return prev;
        }

        showToast("Added to compare", "success");
        return [...prev, id];
      });
    },
    [setCompareVehicles, showToast]
  );

  const login = useCallback(
    (user) => {
      setUserData(user);
      showToast(`Welcome back, ${user.name || user.email}`);
    },
    [setUserData, showToast]
  );

  const updateProfile = useCallback(
    (updates) => {
      setUserData((prev) => (prev ? { ...prev, ...updates } : prev));
      showToast("Profile updated", "success");
    },
    [setUserData, showToast]
  );

  const logout = useCallback(() => {
    setUserData(null);
    showToast("Logged out", "info");
  }, [setUserData, showToast]);

  const addListing = useCallback(
    (listing) => {
      const newListing = {
        ...listing,
        id: "s" + Date.now(),
        ownerEmail: userData?.email || listing.email || "",
        createdAt: new Date().toISOString(),
      };

      setSellerListings((prev) => [newListing, ...prev]);
      showToast("Vehicle listing created", "success");
    },
    [setSellerListings, showToast, userData?.email]
  );

  const removeListing = useCallback(
    (id) => {
      setSellerListings((prev) => prev.filter((l) => l.id !== id));
      showToast("Listing removed", "info");
    },
    [setSellerListings, showToast, userData?.email]
  );

  const addEnquiry = useCallback(
    (enquiry) => {
      const newEnquiry = {
        ...enquiry,
        id: "e" + Date.now(),
        createdAt: new Date().toISOString(),
      };
      setEnquiries((prev) => [newEnquiry, ...prev]);
      showToast("Your enquiry was submitted successfully", "success");
    },
    [setEnquiries, showToast]
  );

  const vehicles = useMemo(() => {
    const custom = sellerListings
      .filter((l) => l.status === "Published")
      .map((l) => ({
        id: l.id,
        type: l.vehicleType || "Car",
        brand: l.brand,
        model: l.model,
        variant: l.variant || "—",
        year: Number(l.year) || 2024,
        registrationYear: Number(l.registrationYear) || Number(l.year) || 2024,
        price: Number(l.price) || 0,
        fuel: l.fuel || "Petrol",
        transmission: l.transmission || "Manual",
        kilometers: Number(l.kilometers) || 0,
        owners: Number(l.owners) || 1,
        color: l.color || "—",
        location: `${l.city || "—"}, ${l.state || "—"}`,
        condition: l.condition || "Good",
        images:
          l.images && l.images.length
            ? l.images
            : makeImages(l.brand, l.model, l.vehicleType || "Car"),
        description: l.description || "Seller-listed vehicle.",
        features: l.features || [],
        seller: {
          name: l.sellerName || "You",
          location: `${l.city || "—"}, ${l.state || "—"}`,
          email: l.email || l.ownerEmail || "",
        },
      }));

    const base = baseVehicles.map((v) => ({
      ...v,
      images:
        v.images && v.images.length
          ? v.images
          : makeImages(v.brand, v.model, v.type),
    }));

    return [...custom, ...base];
  }, [sellerListings]);

  const value = {
    vehicles,
    favoriteVehicles,
    toggleFavorite,
    compareVehicles,
    toggleCompare,
    userData,
    login,
    logout,
    sellerListings,
    addListing,
    removeListing,
    enquiries,
    addEnquiry,
    updateProfile,
    toast,
    showToast,
  };

  return (
    <VehicleContext.Provider value={value}>
      {children}
    </VehicleContext.Provider>
  );
}