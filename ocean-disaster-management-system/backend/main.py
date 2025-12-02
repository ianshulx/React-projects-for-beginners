from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from typing import List, Dict, Any
import json
from datetime import datetime
import asyncio

from routes import router
from api_services import ocean_service  # Updated import

app = FastAPI(
    title="OceanPing API", 
    description="Ocean Hazard Monitoring with Real Weather Data",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173", 
        "http://127.0.0.1:3000",
        "http://localhost:8081",
        "http://127.0.0.1:5173",
        "http://localhost:8080"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")

# WebSocket manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: Dict[str, Any]):
        for connection in self.active_connections[:]:
            try:
                await connection.send_text(json.dumps(message))
            except:
                self.active_connections.remove(connection)

manager = ConnectionManager()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        # Send initial REAL data
        initial_data = await ocean_service.get_combined_forecast()
        
        message = {
            "type": "initial_data", 
            "data": initial_data,
            "timestamp": datetime.now().isoformat()
        }
        await websocket.send_text(json.dumps(message))
        
        while True:
            # Send updates every 15 minutes (real API data)
            await asyncio.sleep(900)  # 15 minutes
            
            update_data = await ocean_service.get_combined_forecast()
            update_message = {
                "type": "weather_update",
                "data": update_data,
                "timestamp": datetime.now().isoformat()
            }
            await websocket.send_text(json.dumps(update_message))
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@app.get("/")
async def root():
    return {
        "message": "🌊 OceanPing API - Real Ocean Weather Data",
        "version": "1.0.0", 
        "status": "operational",
        "features": [
            "✅ Real weather data from Open-Meteo",
            "✅ Generated marine conditions", 
            "✅ Live risk assessment",
            "✅ WebSocket updates",
            "✅ No API keys required"
        ]
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
