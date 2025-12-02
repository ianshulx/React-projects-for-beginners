import { useState, useEffect } from "react";
import { InteractiveMap } from "@/components/InteractiveMap";
import { WeatherForecast } from "@/components/WeatherForecast";
import { SocialMediaFeed } from "@/components/SocialMediaFeed";
import { DonationCard } from "@/components/DonationCard";
import { ChatBot } from "@/components/ChatBot";
import { ReportModal } from "@/components/ReportModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  X,
  Cloud,
  Users,
  Heart,
  Bell,
  MapPin,
  AlertTriangle,
  MessageCircle,
} from "lucide-react";

export default function Index() {
  const [showChat, setShowChat] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [emergencyAlerts, setEmergencyAlerts] = useState<any[]>([]);

  useEffect(() => {
    // Connect to WebSocket for real-time updates
    const connectWebSocket = () => {
      const ws = new WebSocket("ws://localhost:8000/ws");

      ws.onopen = () => {
        console.log("WebSocket connected");
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Real-time update:", data);

        if (data.type === "new_report" || data.type === "initial_data") {
          setDashboardData(data.data);
        }

        if (data.type === "emergency_alert") {
          setEmergencyAlerts((prev) => [data.data, ...prev].slice(0, 5));
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
        setTimeout(connectWebSocket, 3000);
      };

      return ws;
    };

    const ws = connectWebSocket();
    loadDashboardData();

    return () => {
      ws.close();
    };
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/dashboard");
      const data = await response.json();
      setDashboardData(data);
      setEmergencyAlerts(data.emergency_alerts || []);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    }
  };

  const handleEmergencyAlert = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/emergency/alerts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: "Emergency SOS activated from citizen dashboard",
            location: "Current GPS location",
          }),
        }
      );

      if (response.ok) {
        alert(
          "🚨 Emergency alert sent! Help is on the way. Stay calm and follow safety instructions."
        );
      } else {
        alert(
          "Failed to send emergency alert. Please try calling emergency services directly."
        );
      }
    } catch (error) {
      console.error("Emergency alert failed:", error);
      alert("Emergency alert failed. Please call emergency services directly.");
    }
  };

  const handleEvacuate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          alert(
            `🚨 EVACUATION ROUTE:\n\nNearest safe zone: 2.3 km North\nEstimated time: 15 minutes\nFollow evacuation signs to Main Street.\n\nGPS: ${latitude.toFixed(
              6
            )}, ${longitude.toFixed(6)}`
          );
        },
        () => {
          alert(
            "🚨 EVACUATION ROUTE:\n\nHead to nearest high ground\nFollow local evacuation signs\nMove away from coastline"
          );
        }
      );
    } else {
      alert(
        "🚨 EVACUATION ROUTE:\n\nHead to nearest high ground\nFollow local evacuation signs\nMove away from coastline"
      );
    }
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* Fullscreen Map */}
      <div className="absolute inset-0 z-0">
        <InteractiveMap
          onReportClick={() => setShowReport(true)}
          onEmergencyClick={handleEmergencyAlert}
          onChatClick={() => setShowChat(true)}
          onDonateClick={() => setShowSidebar(true)}
        />
      </div>

      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-sm border-b shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">🌊</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">OceanPing</h1>
              <p className="text-xs text-gray-600">Citizen Dashboard</p>
            </div>

            {/* Live Status Indicator */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-600 ml-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Live ({dashboardData?.reports?.length || 0} reports)</span>
            </div>
          </div>

          {/* Top Right Controls - Only utility buttons */}
          <div className="flex items-center gap-2">
            {/* Emergency Alerts Indicator */}
            {emergencyAlerts.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="relative text-red-600 hover:bg-red-50"
                onClick={() => setShowSidebar(true)}
                title="Emergency Alerts"
              >
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-white text-xs">
                  {emergencyAlerts.length}
                </Badge>
              </Button>
            )}

            {/* Weather Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowWeather(!showWeather)}
              className="text-gray-600 hover:bg-gray-100"
              title="Weather Forecast"
            >
              <Cloud className="w-4 h-4" />
            </Button>

            {/* Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSidebar(!showSidebar)}
              className="text-gray-600 hover:bg-gray-100"
              title="Menu"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Emergency Action Buttons - Top Left */}
      <div className="absolute top-20 left-4 z-30 flex flex-col gap-3">
        {/* Evacuate Button */}
        <Button
          onClick={handleEvacuate}
          size="lg"
          className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg rounded-lg px-4 py-3 transition-all hover:scale-105 flex items-center gap-2"
          title="Evacuate Now"
        >
          <span className="text-3xl">🚨</span>
          <span className="font-semibold text-sm hidden sm:inline">
            EVACUATE
          </span>
        </Button>

        {/* SOS Button */}
        <Button
          onClick={handleEmergencyAlert}
          size="lg"
          className="bg-red-500 hover:bg-red-600 text-white shadow-lg rounded-lg px-4 py-3 transition-all hover:scale-105 flex items-center gap-2"
          title="Emergency SOS"
        >
          <span className="text-3xl">🆘</span>
          <span className="font-semibold text-sm hidden sm:inline">SOS</span>
        </Button>

        {/* Report Button */}
        <Button
          onClick={() => setShowReport(true)}
          size="lg"
          className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg rounded-lg px-4 py-3 transition-all hover:scale-105 flex items-center gap-2"
          title="Report Hazard"
        >
          <MapPin className="w-6 h-6" />
          <span className="font-semibold text-sm hidden sm:inline">REPORT</span>
        </Button>
      </div>

      {/* Weather Card - Floating */}
      {showWeather && (
        <div className="absolute top-20 right-4 z-30 w-80">
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowWeather(false)}
              className="absolute -top-2 -right-2 z-10 bg-white rounded-full shadow-md"
            >
              <X className="w-4 h-4" />
            </Button>
            <WeatherForecast />
          </div>
        </div>
      )}

      {/* Chatbot Button - Bottom Right (Only Button) */}
      <div className="absolute bottom-8 right-8 z-30">
        <Button
          onClick={() => setShowChat(true)}
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white shadow-lg rounded-full w-16 h-16 p-0 transition-all hover:scale-105"
          title="Get Help"
        >
          <MessageCircle className="w-7 h-7" />
        </Button>
      </div>

      {/* Side Panel */}
      {showSidebar && (
        <div className="absolute top-0 right-0 z-40 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300">
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Dashboard</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSidebar(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Live Stats */}
              <div>
                <h3 className="font-semibold mb-3">Live Statistics</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-blue-700">
                      Active Reports
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {dashboardData?.reports?.length || 0}
                    </div>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="font-semibold text-red-700">Hotspots</div>
                    <div className="text-2xl font-bold text-red-600">
                      {dashboardData?.hotspots?.length || 0}
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Alerts */}
              {emergencyAlerts.length > 0 && (
                <div>
                  <h3 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                    🚨 Active Alerts ({emergencyAlerts.length})
                  </h3>
                  <div className="space-y-3">
                    {emergencyAlerts.slice(0, 3).map((alert: any) => (
                      <div
                        key={alert.id}
                        className="p-3 bg-red-50 rounded-lg border border-red-200"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-red-900 text-sm">
                            {alert.title}
                          </h4>
                          <Badge
                            className={`text-xs ${
                              alert.severity === "extreme"
                                ? "bg-red-600 text-white"
                                : alert.severity === "high"
                                ? "bg-orange-500 text-white"
                                : "bg-yellow-500 text-black"
                            }`}
                          >
                            {alert.severity?.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-xs text-red-700">{alert.message}</p>
                        <p className="text-xs text-red-600 mt-2">
                          {new Date(alert.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Media Feed */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Community Feed
                </h3>
                <div className="max-h-60 overflow-y-auto">
                  <SocialMediaFeed />
                </div>
              </div>

              {/* Donation */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Support Safety Efforts
                </h3>
                <DonationCard />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay for sidebar */}
      {showSidebar && (
        <div
          className="absolute inset-0 bg-black/20 z-30"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Modals */}
      <ChatBot open={showChat} onOpenChange={setShowChat} />

      <ReportModal open={showReport} onOpenChange={setShowReport} />
    </div>
  );
}
