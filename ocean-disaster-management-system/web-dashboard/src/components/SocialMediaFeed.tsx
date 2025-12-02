import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, TrendingUp, Clock } from "lucide-react";

interface SocialPost {
  id: string;
  platform: "twitter" | "facebook" | "instagram";
  content: string;
  sentiment: "positive" | "neutral" | "negative";
  engagement: number;
  timestamp: string;
  location?: string;
}

const mockPosts: SocialPost[] = [
  {
    id: "1",
    platform: "twitter",
    content: "Waves getting rougher near the pier. Everyone stay safe out there! #OceanSafety",
    sentiment: "negative",
    engagement: 47,
    timestamp: "15 min ago",
    location: "Coastal Bay"
  },
  {
    id: "2",
    platform: "facebook",
    content: "Beautiful sunset despite the choppy waters. Coast guard patrol is active.",
    sentiment: "neutral",
    engagement: 23,
    timestamp: "32 min ago",
    location: "Marina District"
  },
  {
    id: "3",
    platform: "twitter",
    content: "All clear at South Beach. Lifeguards report normal conditions.",
    sentiment: "positive",
    engagement: 18,
    timestamp: "1 hour ago",
    location: "South Beach"
  }
];

export const SocialMediaFeed = () => {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return "bg-safe";
      case "negative": return "bg-emergency-red";
      case "neutral": return "bg-ocean";
      default: return "bg-muted";
    }
  };

  const aiSummary = "AI Analysis: Moderate increase in ocean-related discussions. 67% of posts mention rougher conditions near pier areas. No immediate threats detected.";

  return (
    <Card className="shadow-card bg-card/80 backdrop-blur-sm border-0">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Social Media Intel</h3>
          <Badge variant="outline" className="text-ocean border-ocean">
            <TrendingUp className="h-3 w-3 mr-1" />
            Live
          </Badge>
        </div>
        
        <div className="p-3 bg-ocean-light rounded-lg border border-ocean/20">
          <p className="text-sm text-ocean font-medium mb-1">AI Summary</p>
          <p className="text-xs text-muted-foreground">{aiSummary}</p>
        </div>
        
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {mockPosts.map((post) => (
            <div key={post.id} className="border border-border rounded-lg p-3 bg-background/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge className={`${getSentimentColor(post.sentiment)} text-white text-xs`}>
                    {post.platform}
                  </Badge>
                  {post.location && (
                    <span className="text-xs text-muted-foreground">{post.location}</span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {post.timestamp}
                </div>
              </div>
              
              <p className="text-sm mb-2">{post.content}</p>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MessageSquare className="h-3 w-3" />
                  {post.engagement}
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getSentimentColor(post.sentiment)} text-white border-0`}
                >
                  {post.sentiment}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};