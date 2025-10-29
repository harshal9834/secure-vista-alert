"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity } from "lucide-react";

export default function SafetyScoreCard() {
  const score = 85; // Example static value; replace with dynamic data later
  const statusLabel =
    score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs Improvement";

  return (
    <Card className="p-6 flex items-center justify-between rounded-xl shadow-sm">
      <div>
        {/* Title + Icon */}
        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Safety Score</h3>
        </div>

        {/* Subtitle */}
        <p className="text-sm text-muted-foreground">AI-powered assessment</p>

        {/* Progress Line */}
        <div className="mt-4 w-64">
          <Progress value={score} />
        </div>
      </div>

      {/* Score and Rating */}
      <div className="text-right">
        <p className="text-4xl font-bold">{score}</p>
        <p className="text-sm text-muted-foreground">{statusLabel}</p>
      </div>
    </Card>
  );
}
