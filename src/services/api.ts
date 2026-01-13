const BASE_URL = "https://agro-guide-backend-0v5t.onrender.com";

export interface RecommendationResponse {
  crop: string;
  advisory: string;
  confidence?: number;
  top_factors?: string[];
  weather: WeatherResponse;
  top_crops?: {
    crop: string;
    probability: number;
  }[];
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
