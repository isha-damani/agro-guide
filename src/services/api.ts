const BASE_URL = "http://127.0.0.1:8000";

export interface RecommendationResponse {
  crop: string;
  advisory: string;
  confidence?: number;
  top_factors?: string[];
  weather: WeatherResponse;
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
  
};
