import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Camera, Video, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ReportModal = ({ open, onOpenChange }: ReportModalProps) => {
  const { toast } = useToast();
  const [reportType, setReportType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [severity, setSeverity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Report Submitted",
      description: "Your hazard report has been submitted to emergency services.",
    });
    
    // Reset form
    setReportType("");
    setDescription("");
    setLocation("");
    setSeverity("");
    onOpenChange(false);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          toast({
            title: "Location captured",
            description: "GPS coordinates added to report",
          });
        },
        (error) => {
          toast({
            title: "Location error",
            description: "Unable to get current location",
            variant: "destructive",
          });
        }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-ocean" />
            Report Ocean Hazard
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="report-type">Hazard Type</Label>
            <Select value={reportType} onValueChange={setReportType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select hazard type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rough-waves">Rough Waves</SelectItem>
                <SelectItem value="rip-current">Rip Current</SelectItem>
                <SelectItem value="debris">Marine Debris</SelectItem>
                <SelectItem value="pollution">Water Pollution</SelectItem>
                <SelectItem value="wildlife">Marine Wildlife Alert</SelectItem>
                <SelectItem value="weather">Severe Weather</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="severity">Severity Level</Label>
            <Select value={severity} onValueChange={setSeverity} required>
              <SelectTrigger>
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - Minor concern</SelectItem>
                <SelectItem value="moderate">Moderate - Caution advised</SelectItem>
                <SelectItem value="high">High - Immediate attention needed</SelectItem>
                <SelectItem value="extreme">Extreme - Emergency response required</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="flex gap-2">
              <Input
                id="location"
                placeholder="Enter location or coordinates"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={getCurrentLocation}
              >
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the hazard in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
            />
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" className="flex-1">
              <Camera className="h-4 w-4 mr-2" />
              Add Photo
            </Button>
            <Button type="button" variant="outline" className="flex-1">
              <Video className="h-4 w-4 mr-2" />
              Add Video
            </Button>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="emergency" className="flex-1">
              Submit Report
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};