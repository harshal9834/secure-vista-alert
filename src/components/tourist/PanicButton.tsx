import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PanicButton = () => {
  const { toast } = useToast();
  const [isPanicActive, setIsPanicActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePanicButton = async () => {
    setIsLoading(true);

    try {
      // Get current location
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000
        });
      });

      const { latitude, longitude } = position.coords;

      // Call emergency alert function
      const { data, error } = await supabase.functions.invoke('send-emergency-alert', {
        body: {
          location_lat: latitude,
          location_lng: longitude,
          location_name: "Current Location",
          alert_type: "panic_button",
          description: "Emergency panic button activated"
        }
      });

      if (error) throw error;

      setIsPanicActive(true);
      toast({
        title: "Emergency Alert Activated",
        description: "Your location has been shared with police and emergency contacts.",
        variant: "destructive",
      });

      setTimeout(() => setIsPanicActive(false), 5000);
    } catch (error) {
      console.error('Error sending emergency alert:', error);
      toast({
        title: "Alert Error",
        description: "Failed to send emergency alert. Please call emergency services directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
        disabled={isPanicActive || isLoading}
      >
        {isPanicActive ? (
          <>
            <AlertCircle className="h-6 w-6 mr-2 animate-pulse" />
            ALERT SENT - HELP IS ON THE WAY
          </>
        ) : isLoading ? (
          "SENDING ALERT..."
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
  );
};

export default PanicButton;