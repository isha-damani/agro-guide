import { Cloud, Droplets, Thermometer, MapPin, Loader2 } from 'lucide-react';
import { Card } from './ui/card';

interface WeatherCardProps {
  weather: {
    temperature: number;
    humidity: number;
    description: string;
    city: string;
  } | null;
  isLoading: boolean;
  error: string | null;
}

const WeatherCard = ({ weather, isLoading, error }: WeatherCardProps) => {
  if (isLoading) {
    return (
      <Card className="p-6 bg-card border-0 card-3d">
        <div className="flex items-center justify-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin text-accent" />
          <span className="text-muted-foreground">Fetching weather data...</span>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 bg-card border-0 card-3d">
        <div className="text-center text-muted-foreground">
          <Cloud className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">{error}</p>
        </div>
      </Card>
    );
  }

  if (!weather) {
    return (
      <Card className="p-6 bg-card border-0 card-3d">
        <div className="text-center text-muted-foreground">
          <Cloud className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Enter a city to see weather data</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card border-0 card-3d animate-fade-up">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shadow-soft transition-transform duration-200 hover:scale-110">
          <MapPin className="w-4 h-4 text-accent" />
        </div>
        <h3 className="font-serif font-semibold text-lg text-foreground">{weather.city}</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 transition-all duration-200 hover:bg-muted/70 hover:shadow-soft cursor-default">
          <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center transition-transform duration-200 hover:scale-105">
            <Thermometer className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{weather.temperature}°C</p>
            <p className="text-xs text-muted-foreground">Temperature</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 transition-all duration-200 hover:bg-muted/70 hover:shadow-soft cursor-default">
          <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center transition-transform duration-200 hover:scale-105">
            <Droplets className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{weather.humidity}%</p>
            <p className="text-xs text-muted-foreground">Humidity</p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground capitalize text-center">
        {weather.description}
      </p>
    </Card>
  );
};

export default WeatherCard;
