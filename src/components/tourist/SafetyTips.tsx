import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface SafetyTip {
  id: string;
  title: string;
  content: string;
  category: string;
  priority: number;
}

const SafetyTips = () => {
  const [tips, setTips] = useState<SafetyTip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSafetyTips();
  }, []);

  const fetchSafetyTips = async () => {
    const { data, error } = await supabase
      .from('safety_tips')
      .select('*')
      .eq('is_active', true)
      .order('priority', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Error fetching safety tips:', error);
    } else {
      setTips(data || []);
    }
    setLoading(false);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      general: "bg-primary/10 text-primary border-primary/20",
      health: "bg-success/10 text-success border-success/20",
      crime: "bg-destructive/10 text-destructive border-destructive/20",
      weather: "bg-accent/10 text-accent border-accent/20",
      transportation: "bg-warning/10 text-warning border-warning/20",
      cultural: "bg-primary/10 text-primary border-primary/20",
      emergency: "bg-destructive/10 text-destructive border-destructive/20"
    };
    return colors[category] || colors.general;
  };

  if (loading) {
    return (
      <Card className="p-6 shadow-[var(--shadow-medium)]">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-accent" />
          Safety Tips
        </h3>
        <p className="text-sm text-muted-foreground">Loading tips...</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 shadow-[var(--shadow-medium)]">
      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-accent" />
        Safety Tips for Your Journey
      </h3>
      <div className="space-y-3">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium text-foreground">{tip.title}</h4>
                  <Badge variant="outline" className={getCategoryColor(tip.category)}>
                    {tip.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{tip.content}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SafetyTips;