from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum

class ReportType(str, Enum):
    ROUGH_WAVES = "rough-waves"
    RIP_CURRENT = "rip-current"
    DEBRIS = "debris"
    POLLUTION = "pollution"
    WILDLIFE = "wildlife"
    WEATHER = "weather"
    OTHER = "other"

class SeverityLevel(str, Enum):
    LOW = "low"
    MODERATE = "moderate"
    HIGH = "high"
    EXTREME = "extreme"

class UserRole(str, Enum):
    CITIZEN = "citizen"
    OFFICIAL = "official"
    ANALYST = "analyst"

class Coordinates(BaseModel):
    latitude: float
    longitude: float

class ReportCreate(BaseModel):
    report_type: ReportType
    severity: SeverityLevel
    location: str
    coordinates: Coordinates
    description: str
    media_urls: Optional[List[str]] = []

class Report(BaseModel):
    id: str
    report_type: ReportType
    severity: SeverityLevel
    location: str
    coordinates: Coordinates
    description: str
    media_urls: List[str] = []
    status: str = "pending"
    created_at: datetime
    updated_at: Optional[datetime] = None

class WeatherData(BaseModel):
    location: str
    temperature: float
    wave_height: float
    wind_speed: float
    visibility: float
    risk_level: SeverityLevel
    warnings: List[str] = []
    forecast_time: datetime

class EmergencyAlert(BaseModel):
    id: str
    alert_type: str
    severity: SeverityLevel
    title: str
    message: str
    affected_area: List[Coordinates]
    created_at: datetime
    expires_at: datetime

class SocialMediaPost(BaseModel):
    id: str
    platform: str
    content: str
    sentiment: str
    relevance_score: float
    coordinates: Optional[Coordinates] = None
    created_at: datetime
    
class HotspotData(BaseModel):
    id: str
    coordinates: Coordinates
    intensity: float  # 0-1 scale
    report_count: int
    radius_km: float
    hazard_types: List[ReportType]
    created_at: datetime

class ChatMessage(BaseModel):
    content: str
    sender: str  # "user" or "bot"
    timestamp: datetime

class ChatRequest(BaseModel):
    message: str
    conversation_history: Optional[List[ChatMessage]] = []

class ChatResponse(BaseModel):
    response: str
    timestamp: datetime