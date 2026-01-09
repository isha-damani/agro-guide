const BASE_URL = "http://127.0.0.1:8000";

export interface RecommendationResponse {
  crop: string;
  confidence: number;
  advisory: string;
}

export interface WeatherResponse {
  temperature: number;
  humidity: number;
  description: string;
  city: string;
}


export const apiService = {
  async getRecommendation(data: any): Promise<RecommendationResponse> {
    const response = await fetch(`${BASE_URL}/recommend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch recommendation");
    }

    return response.json();
  },

  async getWeather(city: string): Promise<WeatherResponse> {
    return {
      temperature: 28,
      humidity: 70,
      description: "Partly cloudy",
      city: city,
    };
  },
  
};
