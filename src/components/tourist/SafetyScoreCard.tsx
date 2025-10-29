import { Card } from "@/components/ui/card";
import { Activity } from "lucide-react";

interface SafetyScoreCardProps {
  score: number;
}

const SafetyScoreCard = ({ score }: SafetyScoreCardProps) => {
  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Attention";
  };

  return (
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
          <div className="text-4xl font-bold text-success">{score}</div>
          <p className="text-xs text-muted-foreground">{getScoreLabel(score)}</p>
        </div>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="bg-success h-2 rounded-full transition-all duration-500"
          style={{ width: `${score}%` }}
        />
      </div>
    </Card>
  );
};

export default SafetyScoreCard;