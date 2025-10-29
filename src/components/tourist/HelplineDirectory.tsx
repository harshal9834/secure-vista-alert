import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Helpline {
  id: string;
  name: string;
  category: string;
  phone_number: string;
  available_24_7: boolean;
}

const HelplineDirectory = () => {
  const [helplines, setHelplines] = useState<Helpline[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHelplines();
  }, []);

  const fetchHelplines = async () => {
    const { data, error } = await supabase
      .from('helplines')
      .select('*')
      .eq('is_active', true)
      .order('category');

    if (error) {
      console.error('Error fetching helplines:', error);
    } else {
      setHelplines(data || []);
    }
    setLoading(false);
  };

  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      police: "🚓",
      ambulance: "🚑",
      fire: "🚒",
      tourist_helpline: "🏛️",
      women_helpline: "👩",
      disaster: "⚠️",
      other: "📞"
    };
    return icons[category] || icons.other;
  };

  if (loading) {
    return (
      <Card className="p-6 shadow-[var(--shadow-medium)]">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Phone className="h-5 w-5 text-primary" />
          Emergency Helplines
        </h3>
        <p className="text-sm text-muted-foreground">Loading helplines...</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 shadow-[var(--shadow-medium)]">
      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
        <Phone className="h-5 w-5 text-primary" />
        Emergency Helplines
      </h3>
      <div className="space-y-3">
        {helplines.map((helpline) => (
          <div
            key={helpline.id}
            className="p-4 rounded-lg border bg-card"
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getCategoryIcon(helpline.category)}</span>
                <div>
                  <h4 className="font-medium text-foreground">{helpline.name}</h4>
                  <p className="text-sm text-muted-foreground">{helpline.phone_number}</p>
                </div>
              </div>
              {helpline.available_24_7 && (
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  24/7
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                onClick={() => handleCall(helpline.phone_number)}
                className="w-full"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCall(helpline.phone_number)}
                className="w-full"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Text
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default HelplineDirectory;