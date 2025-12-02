import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface EmergencyCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  variant: "emergency" | "sos" | "safe" | "warning";
  onClick: () => void;
  children?: ReactNode;
}

export const EmergencyCard = ({ 
  title, 
  description, 
  icon: Icon, 
  variant, 
  onClick,
  children 
}: EmergencyCardProps) => {
  return (
    <Card className="shadow-card hover:shadow-ocean transition-smooth border-0 bg-card/80 backdrop-blur-sm">
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-full ${
            variant === 'emergency' ? 'ocean-gradient' :
            variant === 'sos' ? 'emergency-gradient' :
            variant === 'safe' ? 'safe-gradient' :
            'bg-warning'
          }`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        
        {children && (
          <div className="space-y-3">
            {children}
          </div>
        )}
        
        <Button 
          variant={variant} 
          className="w-full h-12 text-base"
          onClick={onClick}
        >
          <Icon className="h-5 w-5 mr-2" />
          {title}
        </Button>
      </div>
    </Card>
  );
};