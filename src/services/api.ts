import { API_ENDPOINTS } from '@/config/api';

export interface SoilData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  temperature: number;
  rainfall: number;
  city: string;
}

export interface RecommendationResponse {
  crop: string;
  advisory: string;
  confidence?: number;
}

export interface WeatherResponse {
  temperature: number;
  humidity: number;
  description: string;
  city: string;
  icon?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

class ApiService {
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error: ApiError = {
        message: `Request failed with status ${response.status}`,
        status: response.status,
      };
      
      try {
        const errorData = await response.json();
        error.message = errorData.message || error.message;
      } catch {
        // Use default error message
      }
      
      throw error;
    }
    
    return response.json();
  }

  async getRecommendation(data: SoilData): Promise<RecommendationResponse> {
    const response = await fetch(API_ENDPOINTS.recommend, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return this.handleResponse<RecommendationResponse>(response);
  }

  async getWeather(city: string): Promise<WeatherResponse> {
    const response = await fetch(`${API_ENDPOINTS.weather}?city=${encodeURIComponent(city)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return this.handleResponse<WeatherResponse>(response);
  }
}

export const apiService = new ApiService();
