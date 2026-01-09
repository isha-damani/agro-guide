import { Sprout, Lightbulb } from 'lucide-react';
import { Card } from './ui/card';

interface RecommendationCardProps {
  recommendation: {
    crop: string;
    advisory: string;
    confidence?: number;
  };
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
        {recommendation.confidence && (
          <p className="text-sm text-muted-foreground mt-1">
            Confidence: {Math.round(recommendation.confidence * 100)}%
          </p>
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
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecommendationCard;
