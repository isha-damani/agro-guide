import { useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SoilForm from '@/components/SoilForm';
import WeatherCard from '@/components/WeatherCard';
import RecommendationCard from '@/components/RecommendationCard';
import { apiService, RecommendationResponse, WeatherResponse } from '@/services/api';

const Recommend = () => {
  const [recommendation, setRecommendation] = useState<RecommendationResponse | null>(null);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(false);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  // Debounce city input for weather fetch
  const fetchWeather = useCallback(async (city: string) => {
    if (!city || city.length < 2) {
      setWeather(null);
      setWeatherError(null);
      return;
    }

    setIsLoadingWeather(true);
    setWeatherError(null);

    try {
      const data = await apiService.getWeather(city);
      setWeather(data);
    } catch (error) {
      setWeatherError('Unable to fetch weather data. Please check the city name.');
      setWeather(null);
    } finally {
      setIsLoadingWeather(false);
    }
  }, []);

  // Debounced city change handler
  let cityTimeout: NodeJS.Timeout;
  const handleCityChange = (city: string) => {
    clearTimeout(cityTimeout);
    cityTimeout = setTimeout(() => {
      fetchWeather(city);
    }, 800);
  };

  const handleSubmit = async (formData: {
    nitrogen: string;
    phosphorus: string;
    potassium: string;
    ph: string;
    temperature: string;
    rainfall: string;
    city: string;
  }) => {
    setIsLoadingRecommendation(true);
    setRecommendation(null);

    try {
      const data = await apiService.getRecommendation({
        nitrogen: parseFloat(formData.nitrogen),
        phosphorus: parseFloat(formData.phosphorus),
        potassium: parseFloat(formData.potassium),
        ph: parseFloat(formData.ph),
        temperature: parseFloat(formData.temperature),
        rainfall: parseFloat(formData.rainfall),
        city: formData.city,
      });

      setRecommendation(data);
      
      toast({
        title: "Recommendation Ready!",
        description: `Based on your soil data, we recommend growing ${data.crop}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get recommendation. Please ensure the backend server is running.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingRecommendation(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-pastel-green">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-up">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Crop Recommendation
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enter your soil parameters and location to receive AI-powered crop recommendations 
              tailored to your conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <SoilForm
                onSubmit={handleSubmit}
                isLoading={isLoadingRecommendation}
                onCityChange={handleCityChange}
              />
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Weather Info */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Weather Info
                </h3>
                <WeatherCard
                  weather={weather}
                  isLoading={isLoadingWeather}
                  error={weatherError}
                />
              </div>

              {/* Recommendation */}
              {recommendation && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Your Recommendation
                  </h3>
                  <RecommendationCard recommendation={recommendation} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Recommend;