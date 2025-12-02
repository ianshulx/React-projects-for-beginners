import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Heart, DollarSign, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const donationGoal = 50000;
const currentAmount = 32500;
const donorCount = 156;

export const DonationCard = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const quickAmounts = [10, 25, 50, 100];

  const handleDonate = () => {
    const donationAmount = selectedAmount || parseFloat(amount);
    if (donationAmount && donationAmount > 0) {
      toast({
        title: "Thank you for your donation!",
        description: `Your contribution of $${donationAmount} helps support ocean safety initiatives.`,
      });
      setAmount("");
      setSelectedAmount(null);
    }
  };

  const progressPercentage = (currentAmount / donationGoal) * 100;

  return (
    <Card className="shadow-card bg-card/80 backdrop-blur-sm border-0">
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-emergency-red" />
          <h3 className="font-semibold text-lg">Ocean Safety Relief Fund</h3>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Support emergency response equipment and community safety programs
        </p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-semibold">${currentAmount.toLocaleString()} / ${donationGoal.toLocaleString()}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {donorCount} donors
            </div>
            <div>{Math.round(progressPercentage)}% funded</div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-2">
            {quickAmounts.map((quickAmount) => (
              <Button
                key={quickAmount}
                variant={selectedAmount === quickAmount ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedAmount(quickAmount);
                  setAmount(quickAmount.toString());
                }}
              >
                ${quickAmount}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <div className="relative flex-1">
              <DollarSign className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Custom amount"
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                className="pl-9"
              />
            </div>
            <Button 
              variant="safe" 
              onClick={handleDonate}
              disabled={!amount && !selectedAmount}
            >
              Donate
            </Button>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground border-t pt-3">
          100% of donations go directly to ocean safety equipment and emergency response training.
        </div>
      </div>
    </Card>
  );
};