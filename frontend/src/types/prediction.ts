export interface PredictionRequest {
    carpet_area_sqft: number;
    floor_num: number;
    bathroom: number;
    balcony: number;
    location: string;
    furnishing: string;
    transaction: string;
    ownership: string;
    facing: string;
  }
  
  export interface PredictionResponse {
    predicted_price: number;
  }