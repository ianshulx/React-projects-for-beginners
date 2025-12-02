import random
import uuid
from datetime import datetime, timedelta
from typing import List, Dict, Any
from models import ReportType, SeverityLevel, Report, WeatherData, EmergencyAlert, SocialMediaPost, HotspotData, Coordinates

# Mock data for reports
def generate_mock_reports(count: int = 20) -> List[Dict[str, Any]]:
    reports = []

    # India coastal locations
    locations = [
        {"name": "Mumbai Coast", "lat": 18.96, "lng": 72.82},
        {"name": "Chennai Beach", "lat": 13.08, "lng": 80.27},
        {"name": "Kolkata Riverside", "lat": 22.57, "lng": 88.36},
        {"name": "Goa Beach", "lat": 15.50, "lng": 73.83},
        {"name": "Visakhapatnam Port", "lat": 17.70, "lng": 83.30},
    ]

    report_types = [rt.value for rt in ReportType]
    severity_levels = [sl.value for sl in SeverityLevel]

    for _ in range(count):
        location = random.choice(locations)
        lat_offset = random.uniform(-0.05, 0.05)
        lng_offset = random.uniform(-0.05, 0.05)

        created_at = datetime.now() - timedelta(hours=random.randint(0, 72))

        report = {
            "id": str(uuid.uuid4()),
            "report_type": random.choice(report_types),
            "severity": random.choice(severity_levels),
            "location": location["name"],
            "coordinates": {
                "latitude": location["lat"] + lat_offset,
                "longitude": location["lng"] + lng_offset
            },
            "description": f"Observed {random.choice(['high waves', 'debris', 'oil spill', 'dangerous currents', 'marine wildlife'])} in the area.",
            "media_urls": [],
            "status": random.choice(["pending", "verified", "resolved"]),
            "created_at": created_at.isoformat(),
            "updated_at": (created_at + timedelta(hours=random.randint(1, 5))).isoformat() if random.random() > 0.5 else None
        }
        reports.append(report)

    return reports

# Mock weather forecast data
def generate_mock_weather() -> Dict[str, Any]:
    risk_levels = [sl.value for sl in SeverityLevel]

    weather = {
        "location": "Mumbai Coast",
        "temperature": round(random.uniform(25, 35), 1),
        "wave_height": round(random.uniform(0.5, 4.0), 1),
        "wind_speed": round(random.uniform(5, 25), 1),
        "visibility": round(random.uniform(3, 15), 1),
        "risk_level": random.choice(risk_levels),
        "warnings": [],
        "forecast_time": datetime.now().isoformat()
    }

    if weather["wave_height"] > 2.5:
        weather["warnings"].append("High wave advisory")
    if weather["wind_speed"] > 20:
        weather["warnings"].append("Strong wind warning")
    if weather["visibility"] < 5:
        weather["warnings"].append("Low visibility alert")

    return weather

# Mock emergency alerts
def generate_mock_emergency_alerts(count: int = 3) -> List[Dict[str, Any]]:
    alerts = []

    alert_types = ["tsunami", "cyclone", "storm surge", "coastal flooding", "marine hazard"]
    severity_levels = [sl.value for sl in SeverityLevel]

    for _ in range(count):
        alert_type = random.choice(alert_types)
        severity = random.choice(severity_levels)

        # Center coordinates within India
        center_lat = random.uniform(8.0, 22.0)
        center_lng = random.uniform(72.0, 88.0)

        affected_area = []
        for i in range(4):
            lat_offset = random.uniform(-0.5, 0.5)
            lng_offset = random.uniform(-0.5, 0.5)
            affected_area.append({
                "latitude": center_lat + lat_offset,
                "longitude": center_lng + lng_offset
            })

        created_at = datetime.now() - timedelta(hours=random.randint(0, 24))
        expires_at = created_at + timedelta(hours=random.randint(24, 72))

        alert = {
            "id": str(uuid.uuid4()),
            "alert_type": alert_type,
            "severity": severity,
            "title": f"{alert_type.title()} {severity.title()} Alert",
            "message": f"A {severity} {alert_type} warning has been issued for coastal areas. Take necessary precautions.",
            "affected_area": affected_area,
            "created_at": created_at.isoformat(),
            "expires_at": expires_at.isoformat()
        }
        alerts.append(alert)

    return alerts

# Mock social media posts
def generate_mock_social_posts(count: int = 15) -> List[Dict[str, Any]]:
    posts = []

    platforms = ["twitter", "facebook", "instagram"]
    sentiments = ["positive", "negative", "neutral"]

    sample_contents = [
        "Huge waves at the Mumbai beach today! #dangerous #oceanwarning",
        "Beautiful day at Chennai shore, perfect conditions for swimming.",
        "Oil spill spotted near Goa coast, authorities should check it out @CoastGuard",
        "Cyclone approaching the coast, everyone stay safe!",
        "Debris washing up on the Visakhapatnam beach this morning, cleaned what I could.",
        "Rip currents are strong today, saw lifeguards rescuing someone.",
        "Perfect beach day! No hazards in sight.",
        "Marine wildlife warning: jellyfish spotted in large numbers.",
        "High tide is causing some coastal flooding in the neighborhood.",
        "Visibility is poor due to fog, boaters be careful!"
    ]

    for _ in range(count):
        content = random.choice(sample_contents)
        sentiment = random.choice(sentiments)
        coordinates = None
        if random.random() > 0.3:
            coordinates = {
                "latitude": random.uniform(8.0, 22.0),
                "longitude": random.uniform(72.0, 88.0)
            }
        created_at = datetime.now() - timedelta(hours=random.randint(0, 48))

        post = {
            "id": str(uuid.uuid4()),
            "platform": random.choice(platforms),
            "content": content,
            "sentiment": sentiment,
            "relevance_score": round(random.uniform(0.3, 1.0), 2),
            "coordinates": coordinates,
            "created_at": created_at.isoformat()
        }
        posts.append(post)

    return posts

# Mock hotspot data
def generate_mock_hotspots(count: int = 8) -> List[Dict[str, Any]]:
    hotspots = []

    report_types = [rt.value for rt in ReportType]

    for _ in range(count):
        intensity = round(random.uniform(0.3, 1.0), 2)
        report_count = random.randint(3, 25)
        hazard_count = random.randint(1, 3)
        hazard_types = random.sample(report_types, hazard_count)

        hotspot = {
            "id": str(uuid.uuid4()),
            "coordinates": {
                "latitude": random.uniform(8.0, 22.0),
                "longitude": random.uniform(72.0, 88.0)
            },
            "intensity": intensity,
            "report_count": report_count,
            "radius_km": round(random.uniform(1, 10), 1),
            "hazard_types": hazard_types,
            "created_at": datetime.now().isoformat()
        }
        hotspots.append(hotspot)

    return hotspots

# Get all mock data
def get_all_mock_data() -> Dict[str, Any]:
    return {
        "reports": generate_mock_reports(),
        "weather": generate_mock_weather(),
        "emergency_alerts": generate_mock_emergency_alerts(),
        "social_posts": generate_mock_social_posts(),
        "hotspots": generate_mock_hotspots(),
        "stats": {
            "total_reports": random.randint(100, 500),
            "verified_reports": random.randint(50, 300),
            "active_alerts": random.randint(1, 5),
            "active_users": random.randint(50, 200),
            "reports_today": random.randint(5, 30),
            "response_time_avg": random.uniform(1.0, 24.0)
        }
    }
