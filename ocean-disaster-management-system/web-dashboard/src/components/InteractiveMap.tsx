import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Navigation,
  AlertTriangle,
  Shield,
  Waves,
  Crosshair,
} from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapLocation {
  id: string;
  report_type: string;
  severity: string;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  description: string;
  status?: string;
  created_at: string;
}

interface InteractiveMapProps {
  onReportClick?: () => void;
  onEmergencyClick?: () => void;
  onChatClick?: () => void;
  onDonateClick?: () => void;
}

// Custom icons for different report types
const createCustomIcon = (reportType: string, severity?: string) => {
  const typeColors = {
    "rough-waves": "#ef4444",
    "rip-current": "#dc2626",
    debris: "#f59e0b",
    pollution: "#8b5cf6",
    wildlife: "#10b981",
    weather: "#3b82f6",
    other: "#6b7280",
  };

  const severityColors = {
    low: "#10b981",
    moderate: "#f59e0b",
    high: "#f97316",
    extreme: "#dc2626",
  };

  const color =
    severityColors[severity as keyof typeof severityColors] ||
    typeColors[reportType as keyof typeof typeColors] ||
    "#6b7280";

  const getIcon = (type: string) => {
    const icons = {
      "rough-waves": "🌊",
      "rip-current": "🌀",
      debris: "🗑️",
      pollution: "☢️",
      wildlife: "🐋",
      weather: "🌦️",
      other: "⚠️",
    };
    return icons[type as keyof typeof icons] || "❗";
  };

  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
      ">
        ${getIcon(reportType)}
      </div>
    `,
    className: "custom-div-icon",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });
};

// Component to handle map events
const MapEvents = ({
  onLocationFound,
}: {
  onLocationFound: (lat: number, lng: number) => void;
}) => {
  const map = useMap();

  useEffect(() => {
    // Auto-locate user on component mount
    map.locate({ setView: true, maxZoom: 14 });
    map.on("locationfound", (e) => {
      onLocationFound(e.latlng.lat, e.latlng.lng);
    });
  }, [map, onLocationFound]);

  return null;
};

export const InteractiveMap = ({
  onReportClick,
  onEmergencyClick,
  onChatClick,
  onDonateClick,
}: InteractiveMapProps) => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(
    null
  );
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [mapLocations, setMapLocations] = useState<MapLocation[]>([]);
  const [hotspots, setHotspots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Default center (Mumbai coast for demo - adjust based on your region)
  const defaultCenter: [number, number] = [19.076, 72.8777];

  // Fetch data from your backend
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch dashboard data from your backend
      const response = await fetch("http://localhost:8000/api/dashboard");
      const data = await response.json();

      // Set reports as map locations
      setMapLocations(data.reports || []);
      setHotspots(data.hotspots || []);

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      low: "bg-green-500 text-white",
      moderate: "bg-yellow-500 text-black",
      high: "bg-orange-500 text-white",
      extreme: "bg-red-500 text-white",
    };
    return colors[severity as keyof typeof colors] || "bg-gray-500 text-white";
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      verified: "bg-blue-100 text-blue-800",
      resolved: "bg-green-100 text-green-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const handleLocationFound = (lat: number, lng: number) => {
    setUserLocation([lat, lng]);
  };

  const centerOnUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(
            "Unable to get your location. Please enable location services."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const formatTimeAgo = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* Map Container */}
      <MapContainer
        center={userLocation || defaultCenter}
        zoom={12}
        className="w-full h-full rounded-lg z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        <MapEvents onLocationFound={handleLocationFound} />

        {/* Report Markers */}
        {mapLocations.map((location) => (
          <Marker
            key={location.id}
            position={[
              location.coordinates.latitude,
              location.coordinates.longitude,
            ]}
            icon={createCustomIcon(location.report_type, location.severity)}
            eventHandlers={{
              click: () => setSelectedLocation(location),
            }}
          >
            <Popup className="custom-popup">
              <div className="p-3 min-w-[250px]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {location.report_type === "rough-waves" && (
                      <Waves className="w-4 h-4 text-blue-500" />
                    )}
                    {location.report_type === "debris" && (
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    )}
                    {location.report_type === "pollution" && (
                      <AlertTriangle className="w-4 h-4 text-purple-500" />
                    )}
                    {location.report_type === "wildlife" && (
                      <Shield className="w-4 h-4 text-green-500" />
                    )}
                    <h3 className="font-semibold text-gray-800 capitalize">
                      {location.report_type.replace("-", " ")}
                    </h3>
                  </div>
                  <Badge className={getSeverityColor(location.severity)}>
                    {location.severity.toUpperCase()}
                  </Badge>
                </div>

                <div className="space-y-2 mb-3">
                  <p className="text-sm text-gray-600">
                    <MapPin className="w-3 h-3 inline mr-1" />
                    {location.location}
                  </p>
                  <p className="text-sm text-gray-700">
                    {location.description}
                  </p>
                  <div className="flex justify-between items-center text-xs">
                    <Badge
                      variant="secondary"
                      className={getStatusColor(location.status || "pending")}
                    >
                      {(location.status || "pending").toUpperCase()}
                    </Badge>
                    <span className="text-gray-500">
                      {formatTimeAgo(location.created_at)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs"
                  >
                    <Navigation className="w-3 h-3 mr-1" />
                    Navigate
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs"
                  >
                    Details
                  </Button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Hotspot Markers */}
        {hotspots.map((hotspot) => (
          <Marker
            key={hotspot.id}
            position={[
              hotspot.coordinates.latitude,
              hotspot.coordinates.longitude,
            ]}
            icon={L.divIcon({
              html: `
                <div style="
                  background-color: rgba(239, 68, 68, ${hotspot.intensity});
                  width: ${20 + hotspot.intensity * 30}px;
                  height: ${20 + hotspot.intensity * 30}px;
                  border-radius: 50%;
                  border: 2px solid #dc2626;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  font-weight: bold;
                  font-size: ${8 + hotspot.intensity * 4}px;
                ">
                  🔥
                </div>
              `,
              className: "hotspot-marker",
              iconSize: [
                20 + hotspot.intensity * 30,
                20 + hotspot.intensity * 30,
              ],
              iconAnchor: [
                (20 + hotspot.intensity * 30) / 2,
                (20 + hotspot.intensity * 30) / 2,
              ],
            })}
          >
            <Popup>
              <div className="p-2">
                <h4 className="font-semibold text-red-600 mb-2">
                  🔥 High Activity Zone
                </h4>
                <p className="text-sm mb-2">
                  <strong>Intensity:</strong>{" "}
                  {(hotspot.intensity * 100).toFixed(0)}%
                </p>
                <p className="text-sm mb-2">
                  <strong>Reports:</strong> {hotspot.report_count}
                </p>
                <p className="text-sm mb-2">
                  <strong>Radius:</strong> {hotspot.radius_km} km
                </p>
                <p className="text-sm">
                  <strong>Hazard Types:</strong>{" "}
                  {hotspot.hazard_types.join(", ")}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* User Location Marker */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={L.divIcon({
              html: `
                <div style="
                  background-color: #2563eb;
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  border: 4px solid white;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                  position: relative;
                ">
                  <div style="
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    width: 24px;
                    height: 24px;
                    border: 2px solid #2563eb;
                    border-radius: 50%;
                    animation: pulse 2s infinite;
                  "></div>
                </div>
              `,
              className: "user-location-icon",
              iconSize: [20, 20],
              iconAnchor: [10, 10],
            })}
          >
            <Popup>Your Current Location</Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Map Controls - Only location and refresh */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <Button
          onClick={centerOnUser}
          size="sm"
          className="bg-white text-gray-700 hover:bg-gray-50 border shadow-md"
        >
          <Crosshair className="w-4 h-4 mr-1" />
          My Location
        </Button>

        <Button
          onClick={fetchDashboardData}
          size="sm"
          className="bg-white text-gray-700 hover:bg-gray-50 border shadow-md"
        >
          🔄 Refresh
        </Button>
      </div>

      {/* Legend - Clean positioning */}
      <Card className="absolute bottom-6 left-6 z-[1000] p-4 bg-white/95 backdrop-blur-sm max-w-xs">
        <h4 className="font-semibold mb-3 text-sm flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          Map Legend
        </h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
              ✓
            </div>
            <span>Low Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs">
              ⚠
            </div>
            <span>Moderate Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs">
              !
            </div>
            <span>High Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
              🚨
            </div>
            <span>Extreme Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-400 flex items-center justify-center text-white text-xs">
              🔥
            </div>
            <span>Hotspot Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">
              📍
            </div>
            <span>Your Location</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Add custom CSS for animations (same as before)
const style = document.createElement("style");
style.textContent = `
  @keyframes pulse {
    0% {
      transform: scale(0.95);
      opacity: 1;
    }
    70% {
      transform: scale(1);
      opacity: 0;
    }
    100% {
      transform: scale(0.95);
      opacity: 0;
    }
  }
  
  .custom-popup .leaflet-popup-content-wrapper {
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  }
  
  .custom-popup .leaflet-popup-tip {
    background: white;
  }
`;
document.head.appendChild(style);
