import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const SafeStatusButton = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSafeStatus = async () => {
    setLoading(true);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: profile } = await supabase
        .from('tourist_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!profile) throw new Error("Profile not found");

      const { error } = await supabase
        .from('safety_status')
        .insert({
          tourist_id: profile.id,
          status: 'safe',
          location_lat: latitude,
          location_lng: longitude,
          location_name: "Current Location",
          message: "I'm safe and well!"
        });

      if (error) throw error;

      toast({
        title: "Status Shared",
        description: "Your safety status has been shared with emergency contacts.",
      });
    } catch (error) {
      console.error('Error updating safe status:', error);
      toast({
        title: "Update Failed",
        description: "Failed to share status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="success"
      onClick={handleSafeStatus}
      disabled={loading}
      className="w-full"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sharing Status...
        </>
      ) : (
        <>
          <CheckCircle className="mr-2 h-4 w-4" />
          I'm Safe
        </>
      )}
    </Button>
  );
};

export default SafeStatusButton;