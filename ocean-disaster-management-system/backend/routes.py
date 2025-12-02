from fastapi import APIRouter, HTTPException, Query
from typing import List, Dict, Any, Optional
import uuid
from datetime import datetime
import json
from api_services import ocean_service  # Renamed from free_api_services
import mock_data  # Only for reports now
from models import ChatRequest, ChatResponse
from chat_service import chat_service

router = APIRouter()

@router.get("/dashboard")
async def get_dashboard_data(lat: float = Query(19.0760), lng: float = Query(72.8777)):
    """
    Get dashboard data with REAL API data (no mock weather data)
    """
    try:
        # Get REAL weather and marine data from APIs
        real_weather_data = await ocean_service.get_combined_forecast(lat, lng)
        
        # Only use mock data for reports/alerts (until you have real user reports)
        mock_reports = mock_data.generate_mock_reports(count=8)
        mock_hotspots = mock_data.get_mock_hotspots()
        
        return {
            "weather": real_weather_data,  # 🔥 REAL API DATA
            "emergency_alerts": [],  # Real alerts will come from user reports
            "reports": mock_reports,     # These will be real user reports later
            "hotspots": mock_hotspots,   # These will be calculated from real reports
            "data_sources": ["Open-Meteo Weather API", "Generated Marine Data"],
            "api_status": "operational"
        }
        
    except Exception as e:
        print(f"❌ Dashboard API error: {e}")
        # Even fallback uses real API structure
        fallback_data = await ocean_service.get_combined_forecast(lat, lng)
        return {
            "weather": fallback_data,
            "emergency_alerts": [],
            "reports": mock_data.generate_mock_reports(count=3),
            "hotspots": [],
            "data_sources": ["Fallback Data"],
            "api_status": "degraded"
        }

@router.get("/weather")
async def get_weather_forecast(lat: float = Query(19.0760), lng: float = Query(72.8777)):
    """Get REAL weather forecast"""
    try:
        return await ocean_service.get_combined_forecast(lat, lng)
    except Exception as e:
        print(f"❌ Weather API error: {e}")
        raise HTTPException(status_code=500, detail="Weather service temporarily unavailable")

@router.get("/marine/forecast") 
async def get_marine_forecast(lat: float = Query(19.0760), lng: float = Query(72.8777)):
    """Get marine forecast"""
    try:
        marine_data = await ocean_service.get_marine_data(lat, lng)
        return {
            "location": f"Ocean Point ({lat:.3f}, {lng:.3f})",
            **marine_data,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        print(f"❌ Marine API error: {e}")
        raise HTTPException(status_code=500, detail="Marine service temporarily unavailable")

# Keep existing routes for reports, alerts, etc.
@router.get("/reports")
async def get_reports(
    report_type: Optional[str] = None,
    severity: Optional[str] = None, 
    status: Optional[str] = None,
    limit: int = Query(20, ge=1, le=100)
):
    """Get hazard reports"""
    reports = mock_data.generate_mock_reports(count=30)
    
    if report_type:
        reports = [r for r in reports if r["report_type"] == report_type]
    if severity:
        reports = [r for r in reports if r["severity"] == severity]
    if status:
        reports = [r for r in reports if r["status"] == status]
    
    return reports[:limit]

@router.post("/reports")
async def create_report(report_data: dict):
    """Submit new hazard report"""
    report_id = str(uuid.uuid4())
    report = {
        "id": report_id,
        "created_at": datetime.now().isoformat(),
        "status": "pending",
        **report_data
    }
    
    print(f"📝 New report submitted: {report}")
    return {"message": "Report submitted successfully", "id": report_id, "report": report}

@router.get("/emergency/alerts")
async def get_emergency_alerts():
    """Get emergency alerts (generated from weather conditions)"""
    try:
        # Get current weather conditions
        weather_data = await ocean_service.get_combined_forecast()
        warnings = weather_data.get('warnings', [])
        
        # Convert severe warnings to alerts
        alerts = []
        for i, warning in enumerate(warnings):
            if any(word in warning.lower() for word in ['high', 'strong', 'dangerous', 'reduced']):
                alerts.append({
                    'id': f'weather_{i}',
                    'title': 'Weather Advisory',
                    'message': warning,
                    'severity': 'moderate',
                    'alert_type': 'weather',
                    'created_at': datetime.now().isoformat()
                })
        
        return alerts
        
    except Exception as e:
        print(f"❌ Alerts error: {e}")
        return []

@router.post("/emergency/alerts")
async def create_emergency_alert(alert_data: dict):
    """Create emergency alert (SOS)"""
    alert_id = str(uuid.uuid4())
    alert = {
        "id": alert_id,
        "created_at": datetime.now().isoformat(),
        "status": "active",
        "type": "sos",
        **alert_data
    }
    
    print(f"🚨 EMERGENCY ALERT: {alert}")
    return {"message": "Emergency alert created", "id": alert_id, "alert": alert}

@router.get("/social-feed")
async def get_social_feed(limit: int = Query(10, ge=1, le=50)):
    """Get social media feed"""

    # Sort by relevance score and created_at
    posts.sort(key=lambda x: (x["relevance_score"], x["created_at"]), reverse=True)
    return posts[:limit]

# Debug endpoint to test CORS
@router.get("/test")
async def test_endpoint():
    return {"message": "CORS is working!"}

@router.post("/chat", response_model=ChatResponse)
async def chat_with_bot(request: ChatRequest):
    try:
        response_content = await chat_service.get_chat_response(
            request.message, 
            request.conversation_history
        )
        
        return ChatResponse(
            response=response_content,
            timestamp=datetime.now()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat service error: {str(e)}")
