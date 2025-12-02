const API_BASE_URL = 'http://localhost:8000/api';

export interface DashboardData {
  weather: {
    location: string;
    temperature: number;
    wave_height: number;
    wind_speed: number;
    visibility: number;
    risk_level: string;
    warnings: string[];
    forecast_time: string;
  };
  reports: Array<{
    id: string;
    report_type: string;
    severity: string;
    location: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    description: string;
    status: string;
    created_at: string;
  }>;
  emergency_alerts: Array<{
    id: string;
    alert_type: string;
    severity: string;
    title: string;
    message: string;
    created_at: string;
  }>;
  hotspots: Array<{
    id: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    intensity: number;
    report_count: number;
    radius_km: number;
    hazard_types: string[];
  }>;
}

export interface ReportData {
  report_type: string;
  severity: string;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  description: string;
  media_urls?: string[];
}

export class ApiService {
  static async getDashboardData(): Promise<DashboardData> {
    const response = await fetch(`${API_BASE_URL}/dashboard`);
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }
    return response.json();
  }

  static async submitReport(reportData: ReportData) {
    const response = await fetch(`${API_BASE_URL}/reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit report');
    }
    
    return response.json();
  }

  static async getWeatherForecast(lat?: number, lng?: number) {
    const params = new URLSearchParams();
    if (lat !== undefined) params.append('lat', lat.toString());
    if (lng !== undefined) params.append('lng', lng.toString());
    
    const response = await fetch(`${API_BASE_URL}/weather?${params}`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    return response.json();
  }

  static async getEmergencyAlerts() {
    const response = await fetch(`${API_BASE_URL}/emergency/alerts`);
    if (!response.ok) {
      throw new Error('Failed to fetch emergency alerts');
    }
    return response.json();
  }

  static async getSocialFeed(limit: number = 10) {
    const response = await fetch(`${API_BASE_URL}/social-feed?limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch social feed');
    }
    return response.json();
  }

  static async getEvacuationRoutes(lat: number, lng: number) {
    const response = await fetch(`${API_BASE_URL}/emergency/evacuation-routes?lat=${lat}&lng=${lng}`);
    if (!response.ok) {
      throw new Error('Failed to fetch evacuation routes');
    }
    return response.json();
  }

  // WebSocket connection for real-time updates
  static connectWebSocket(onMessage: (data: any) => void): WebSocket {
    const ws = new WebSocket('ws://localhost:8000/ws');
    
    ws.onopen = () => {
      console.log('WebSocket connected');
      // Send ping to keep connection alive
      setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send('ping');
        }
      }, 30000);
    };
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
    
    return ws;
  }
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export interface ChatRequest {
  message: string;
  conversation_history?: ChatMessage[];
}

export interface ChatResponse {
  response: string;
  timestamp: string;
}

export const chatAPI = {
  sendMessage: async (request: ChatRequest): Promise<ChatResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Remove credentials if not needed
        // credentials: 'include',
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      return response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Test endpoint
  testConnection: async () => {
    const response = await fetch(`${API_BASE_URL}/test`);
    return response.json();
  }
};