import { Sprout, Lightbulb } from 'lucide-react';
import { Card } from './ui/card';
import { RecommendationResponse } from "@/services/api";

interface RecommendationCardProps {
  recommendation: RecommendationResponse;
}

const RecommendationCard = ({ recommendation }: RecommendationCardProps) => {
  return (
    <Card className="p-8 bg-card border-0 card-3d animate-fade-up overflow-hidden">
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-hero flex items-center justify-center mb-4 animate-float shadow-elevated">
          <Sprout className="w-8 h-8 text-primary-foreground" />
        </div>
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Recommended Crop
        </h3>
        <p className="text-4xl font-serif font-bold text-primary mt-2">
          {recommendation.crop}
        </p>
        {recommendation.weather && (
          <div className="flex justify-center gap-3 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-full">
              🌡 {recommendation.weather.temperature}°C
            </span>
            <span className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-full">
              💧 {recommendation.weather.humidity}%
            </span>
            <span className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-full capitalize">
              ☁️ {recommendation.weather.description}
            </span>
          </div>
        )}

        {recommendation.top_crops && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Top Alternatives
            </h4>
            <ul className="space-y-1 text-sm text-foreground">
              {recommendation.top_crops.map((item, idx) => (
                <li key={idx}>
                  {item.crop} — {Math.round(item.probability * 100)}%
                </li>
              ))}
            </ul>
          </div>
        )}
        {recommendation.confidence !== undefined && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-1">
              <span>Confidence</span>
              <span>{Math.round(recommendation.confidence * 100)}%</span>
            </div>

            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div className={`h-full transition-all duration-500 ${
                  recommendation.confidence > 0.8
                    ? "bg-green-500"
                    : recommendation.confidence > 0.4
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${recommendation.confidence * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 rounded-xl bg-muted/50 border border-border/50 transition-all duration-200 hover:bg-muted/70 hover:shadow-soft cursor-default">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform duration-200 hover:scale-110">
            <Lightbulb className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Advisory</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {recommendation.advisory}
            </p>
            {recommendation.top_factors && (
              <div className="mt-4 space-y-2">
                {recommendation.top_factors.map((factor, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-sm bg-background/60 p-2 rounded-lg"
                  >
                    <span className="text-lg">
                      {factor.toLowerCase().includes("nitrogen") && "🧪"}
                      {factor.toLowerCase().includes("temperature") && "🌡"}
                      {factor.toLowerCase().includes("rain") && "🌧"}
                      {factor.toLowerCase().includes("humidity") && "💧"}
                      {!(
                        factor.toLowerCase().includes("nitrogen") ||
                        factor.toLowerCase().includes("temperature") ||
                        factor.toLowerCase().includes("rain") ||
                        factor.toLowerCase().includes("humidity")
                      ) && "⭐"}
                    </span>

                    <span className="text-muted-foreground">{factor}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecommendationCard;
