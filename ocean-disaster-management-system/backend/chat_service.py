import os
from openai import OpenAI
from typing import List
from datetime import datetime
from models import ChatMessage
from dotenv import load_dotenv

load_dotenv()

class ChatService:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.system_prompt = """
You are an AI assistant for OceanPing, a comprehensive ocean disaster management and safety platform. Your role is to provide accurate, helpful, and potentially life-saving information about ocean safety, disaster preparedness, emergency procedures, and evacuation protocols.

Key responsibilities:
- Provide immediate safety guidance during ocean-related emergencies
- Share evacuation routes and emergency procedures
- Offer disaster preparedness tips and safety recommendations
- Answer questions about ocean conditions, weather, and hazards
- Guide users on how to report incidents or request help
- Provide information about coast guard services and emergency contacts

Important guidelines:
- Keep responses concise (under 100 words) and easy to understand
- Always prioritize user safety in your responses
- For life-threatening emergencies, immediately advise calling emergency services (Coast Guard, 911, etc.)
- Provide clear, actionable instructions
- Be concise but thorough when safety is at stake
- If you're uncertain about critical safety information, direct users to official emergency services
- Stay focused on ocean safety, disaster management, and emergency preparedness topics
- Use a calm, professional, and reassuring tone

Remember: You are part of the OceanPing platform, which helps communities prepare for and respond to ocean-related disasters. Your goal is to keep people safe and informed.
"""

    async def get_chat_response(self, user_message: str, conversation_history: List[ChatMessage] = None) -> str:
        try:
            # Build conversation context
            messages = [{"role": "system", "content": self.system_prompt}]
            
            # Add conversation history if provided
            if conversation_history:
                for msg in conversation_history[-10:]:  # Keep last 10 messages for context
                    role = "user" if msg.sender == "user" else "assistant"
                    messages.append({"role": role, "content": msg.content})
            
            # Add current user message
            messages.append({"role": "user", "content": user_message})
            
            # Get response from OpenAI
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages,
                max_tokens=500,
                temperature=0.7
            )
            
            return response.choices[0].message.content
            
        except Exception as e:
            return f"I apologize, but I'm experiencing technical difficulties. For immediate emergency assistance, please contact your local Coast Guard or emergency services at 911. Error: {str(e)}"

# Global instance
chat_service = ChatService()
