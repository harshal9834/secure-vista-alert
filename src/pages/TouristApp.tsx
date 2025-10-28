import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  MapPin,
  AlertCircle,
  Activity,
  User,
  Bell,
  Phone,
  Navigation,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const TouristApp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPanicActive, setIsPanicActive] = useState(false);
  const [safetyScore] = useState(87);

  const handlePanicButton = () => {
    setIsPanicActive(true);
    toast({
      title: "Emergency Alert Activated",
      description: "Your location has been shared with nearest police station and emergency contacts.",
      variant: "destructive",
    });

    setTimeout(() => setIsPanicActive(false), 5000);
  };

  const mockAlerts = [
    {
      type: "warning",
      message: "Approaching restricted zone: Archaeological Site",
      time: "2 min ago",
    },
    {
      type: "info",
      message: "Your safety score increased to 87",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-[var(--shadow-medium)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Exit
            </Button>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              <span className="font-semibold">SafeTourism App</span>
            </div>
            <Button
              variant="ghost"
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6 max-w-2xl">
        {/* Safety Score Card */}
        <Card className="p-6 bg-gradient-to-br from-success/10 to-success/5 border-success/20 shadow-[var(--shadow-medium)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-success/20 p-3">
                <Activity className="h-6 w-6 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Safety Score</h3>
                <p className="text-sm text-muted-foreground">AI-powered assessment</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-success">{safetyScore}</div>
              <p className="text-xs text-muted-foreground">Excellent</p>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-success h-2 rounded-full transition-all duration-500"
              style={{ width: `${safetyScore}%` }}
            />
          </div>
        </Card>

        {/* Panic Button */}
        <Card className="p-6 shadow-[var(--shadow-medium)]">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Phone className="h-5 w-5 text-destructive" />
            Emergency Response
          </h3>
          <Button
            variant={isPanicActive ? "destructive" : "alert"}
            size="lg"
            className="w-full h-20 text-lg font-bold"
            onClick={handlePanicButton}
            disabled={isPanicActive}
          >
            {isPanicActive ? (
              <>
                <AlertCircle className="h-6 w-6 mr-2 animate-pulse" />
                ALERT SENT - HELP IS ON THE WAY
              </>
            ) : (
              <>
                <Phone className="h-6 w-6 mr-2" />
                PRESS FOR EMERGENCY
              </>
            )}
          </Button>
          <p className="text-sm text-muted-foreground mt-3 text-center">
            Instantly notifies police and emergency contacts with your live location
          </p>
        </Card>

        {/* Current Location */}
        <Card className="p-6 shadow-[var(--shadow-medium)]">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-3">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Current Location</h3>
                <p className="text-sm text-muted-foreground">Geo-fencing active</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              Safe Zone
            </Badge>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 mb-3">
            <p className="text-sm font-medium text-foreground">
              Connaught Place, New Delhi
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Last updated: Just now
            </p>
          </div>
          <Button variant="outline" className="w-full">
            <Navigation className="h-4 w-4 mr-2" />
            View on Map
          </Button>
        </Card>

        {/* Recent Alerts */}
        <Card className="p-6 shadow-[var(--shadow-medium)]">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-accent" />
            Recent Alerts
          </h3>
          <div className="space-y-3">
            {mockAlerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  alert.type === "warning"
                    ? "bg-warning/5 border-warning/20"
                    : "bg-primary/5 border-primary/20"
                }`}
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm font-medium text-foreground flex-1">
                    {alert.message}
                  </p>
                  <Badge
                    variant="outline"
                    className={
                      alert.type === "warning"
                        ? "bg-warning/10 text-warning border-warning/20"
                        : "bg-primary/10 text-primary border-primary/20"
                    }
                  >
                    {alert.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{alert.time}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Digital ID Card */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 shadow-[var(--shadow-medium)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-full bg-primary/20 p-3">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Digital Tourist ID</h3>
              <p className="text-sm text-muted-foreground">Blockchain verified</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tourist ID:</span>
              <span className="font-mono font-semibold text-foreground">
                TIN-2025-87432
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Valid Until:</span>
              <span className="font-semibold text-foreground">Jan 15, 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                Active
              </Badge>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-auto py-4 flex-col gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-sm">Safety Tips</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex-col gap-2">
            <Phone className="h-6 w-6 text-primary" />
            <span className="text-sm">Helpline</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TouristApp;
