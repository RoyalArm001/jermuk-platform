import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Link } from "react-router-dom";
import { DATA } from "../../lib/data";

type Props = {
  type: string;
  lang: "hy" | "ru" | "en";
};

function FitToMarkers({ points }: { points: [number, number][] }) {
  const map = useMap();
  React.useEffect(() => {
    if (!points.length) return;
    const b = L.latLngBounds(points.map((p) => L.latLng(p[0], p[1])));
    map.fitBounds(b.pad(0.15));
  }, [map, points]);
  return null;
}

// Fix default marker icons (Vite)
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function MapView({ type, lang }: Props) {
  const list: any[] = (DATA[type] || []) as any[];
  const items = list.filter((x) => typeof x?.geo?.lat === "number" && typeof x?.geo?.lng === "number" && x.geo.lat && x.geo.lng);

  const points: [number, number][] = items.map((x) => [x.geo.lat, x.geo.lng]);

  // Jermuk rough center (fallback) — user will refine later with real coords
  const center: [number, number] = points[0] || [39.8415, 45.6699];

  return (
    <div className="rounded-3xl overflow-hidden border border-[var(--border)]">
      <MapContainer center={center} zoom={13} style={{ height: 420, width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitToMarkers points={points} />
        {items.map((p) => (
          <Marker key={p.id} position={[p.geo.lat, p.geo.lng]} icon={DefaultIcon}>
            <Popup>
              <div style={{ minWidth: 180 }}>
                <div style={{ fontWeight: 800, marginBottom: 6 }}>{p.title?.[lang]}</div>
                <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 8 }}>{p.desc?.[lang]}</div>
                <Link to={`/place/${type}/${p.id}`} style={{ fontWeight: 800, color: "var(--accent)" }}>
                  Open →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
