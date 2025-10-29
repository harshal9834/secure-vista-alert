import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  MapPin,
  User,
  Bell,
  Navigation,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import SafetyScoreCard from "@/components/tourist/SafetyScoreCard";
import PanicButton from "@/components/tourist/PanicButton";
import SafetyTips from "@/components/tourist/SafetyTips";
import HelplineDirectory from "@/components/tourist/HelplineDirectory";
import IncidentReport from "@/components/tourist/IncidentReport";
import SafeStatusButton from "@/components/tourist/SafeStatusButton";

const TouristApp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    setUser(session.user);

    // Get or create tourist profile
    let { data: existingProfile } = await supabase
      .from('tourist_profiles')
      .select('*')
      .eq('user_id', session.user.id)
      .maybeSingle();

    if (!existingProfile) {
      // Create profile if it doesn't exist
      const { data: newProfile, error } = await supabase
        .from('tourist_profiles')
        .insert({
          user_id: session.user.id,
          full_name: session.user.user_metadata?.full_name || session.user.email || 'Tourist',
          country: 'India',
          phone_number: session.user.phone || 'Not provided',
          safety_score: 85
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating profile:', error);
      } else {
        existingProfile = newProfile;
      }
    }

    setProfile(existingProfile);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading your safety dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-[var(--shadow-medium)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div></div>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              <span className="font-semibold">SafeTourism App</span>
            </div>
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6 max-w-2xl">
        {/* Safety Score Card */}
        <SafetyScoreCard score={profile?.safety_score || 85} />

        {/* Panic Button */}
        <PanicButton />

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

        {/* Safety Tips */}
        <SafetyTips />

        {/* Helpline Directory */}
        <HelplineDirectory />

        {/* Digital ID Card */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 shadow-[var(--shadow-medium)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-full bg-primary/20 p-3">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Digital Tourist ID</h3>
              <p className="text-sm text-muted-foreground">Secure verification</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name:</span>
              <span className="font-semibold text-foreground">
                {profile?.full_name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tourist ID:</span>
              <span className="font-mono font-semibold text-foreground text-xs">
                {profile?.id?.substring(0, 13).toUpperCase()}
              </span>
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
          <SafeStatusButton />
          <IncidentReport />
        </div>
      </div>
    </div>
  );
};

export default TouristApp;
