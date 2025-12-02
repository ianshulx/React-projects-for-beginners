import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Waves, Wind, Thermometer, Eye, AlertTriangle } from "lucide-react";

interface ForecastData {
  location: string;
  temperature: number;
  waveHeight: number;
  windSpeed: number;
  visibility: number;
  riskLevel: "low" | "moderate" | "high" | "extreme";
  warnings: string[];
}

const mockForecast: ForecastData = {
  location: "Coastal Bay Area",
  temperature: 22,
  waveHeight: 2.5,
  windSpeed: 18,
  visibility: 8,
  riskLevel: "moderate",
  warnings: ["High tide expected at 3:30 PM", "Small craft advisory in effect"]
};

export const WeatherForecast = () => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "low": return "bg-safe text-white";
      case "moderate": return "bg-warning text-black";
      case "high": return "bg-emergency-orange text-white";
      case "extreme": return "bg-emergency-red text-white";
      default: return "bg-muted";
    }
  };

  return (
    <Card className="shadow-card bg-card/80 backdrop-blur-sm border-0">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Ocean Forecast</h3>
          <Badge className={getRiskColor(mockForecast.riskLevel)}>
            {mockForecast.riskLevel.toUpperCase()} RISK
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground">{mockForecast.location}</p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-ocean" />
            <div>
              <p className="text-sm text-muted-foreground">Temperature</p>
              <p className="font-semibold">{mockForecast.temperature}°C</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Waves className="h-5 w-5 text-ocean" />
            <div>
              <p className="text-sm text-muted-foreground">Wave Height</p>
              <p className="font-semibold">{mockForecast.waveHeight}m</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-ocean" />
            <div>
              <p className="text-sm text-muted-foreground">Wind Speed</p>
              <p className="font-semibold">{mockForecast.windSpeed} km/h</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-ocean" />
            <div>
              <p className="text-sm text-muted-foreground">Visibility</p>
              <p className="font-semibold">{mockForecast.visibility} km</p>
            </div>
          </div>
        </div>
        
        {mockForecast.warnings.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <p className="text-sm font-medium">Active Warnings</p>
            </div>
            {mockForecast.warnings.map((warning, index) => (
              <p key={index} className="text-sm text-muted-foreground pl-6">
                • {warning}
              </p>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};