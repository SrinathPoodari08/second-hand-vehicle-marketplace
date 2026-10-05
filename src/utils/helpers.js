const HUES = {
  Car: 205,
  SUV: 24,
  Sedan: 265,
  Hatchback: 150,
  Bike: 346,
};

// Free Unsplash photos used as realistic second-hand/used-vehicle fallbacks.
const SECOND_HAND_IMAGES = {
  Car: ["/vehicles/swift-used.svg", "/vehicles/nexon-used.svg", "/vehicles/city-used.svg"],
  SUV: ["/vehicles/creta-used.svg", "/vehicles/seltos-used.svg", "/vehicles/nexon-used.svg"],
  Sedan: ["/vehicles/city-used.svg", "/vehicles/swift-used.svg", "/vehicles/city-used.svg"],
  Hatchback: ["/vehicles/swift-used.svg", "/vehicles/nexon-used.svg", "/vehicles/swift-used.svg"],
  Bike: ["/vehicles/classic350-used.svg", "/vehicles/classic350-used.svg", "/vehicles/classic350-used.svg"],
};

export function formatINR(n) {
  if (n == null || Number.isNaN(Number(n))) return "—";
  return "₹" + Number(n).toLocaleString("en-IN");
}

export function formatKm(n) {
  return Number(n).toLocaleString("en-IN") + " km";
}

export function svgPlaceholder(label, sub, hue = 205) {
  const bg1 = `hsl(${hue} 30% 22%)`;
  const bg2 = `hsl(${hue} 45% 34%)`;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="640" height="420">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${bg1}"/>
          <stop offset="1" stop-color="${bg2}"/>
        </linearGradient>
      </defs>
      <rect width="640" height="420" fill="url(#g)"/>
      <g fill="#ffffff" fill-opacity="0.09">
        <circle cx="120" cy="340" r="60"/>
        <circle cx="520" cy="340" r="60"/>
        <rect x="90" y="190" width="460" height="110" rx="14"/>
      </g>
      <text x="32" y="44" font-family="Arial, sans-serif" font-size="26" font-weight="700" fill="#ffffff">${label}</text>
      <text x="32" y="72" font-family="Arial, sans-serif" font-size="16" fill="#ffffff">${sub}</text>
    </svg>
  `;

  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

export function makeImages(brand = "Vehicle", model = "", type = "Car") {
  return SECOND_HAND_IMAGES[type] || SECOND_HAND_IMAGES.Car;
}

export function categoryIllustration(type) {
  // Real vehicle photographs from the same model-specific image set used by
  // the marketplace listings. This keeps Browse by type photographic rather
  // than using the old illustrated SVG cards.
  const categoryImages = {
    Car: "https://mda.spinny.com/sp-file-system/public/2025-07-31/569f271171a149aeb9e01476f22e0fa6/raw/file.JPG",
    SUV: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta/exterior/creta-exterior-1.jpg",
    Sedan: "https://editorial.pxcrush.net/carsales/general/editorial/Honda-City-001.jpg?height=682&width=1024",
    Hatchback: "https://imgd.aeplcdn.com/640X480/image/used/41tm44lbcvho.jpg?fit=true&qp=80",
    Bike: "https://www.thebikeandbrew.com.au/images/bikeandbrew/64647.jpg",
  };

  return categoryImages[type] || categoryImages.Car;
}

export const FEATURE_POOL = [
  "Air Conditioning",
  "Power Windows",
  "ABS",
  "Dual Airbags",
  "Parking Sensors",
  "Rear Camera",
  "Bluetooth Connectivity",
  "Touchscreen Infotainment",
  "Sunroof",
];
