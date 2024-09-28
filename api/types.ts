import {Position} from "@/components/Marker";

export type Corner = {
  id: string,
  name: string,
  noise_value: number,
  position: Position,
  price_factor: number,
}

export type Meassurement = {
    value: number,
    price_factor: number,
    timestamp: string,
}

export type CornerDetails = {
  id: number,
  name: string,
  description: string,
  noise_value: number,
  position: Position,
  price_factor: number,
  noise_value_hour: Meassurement[],
  noise_value_day: Meassurement[],
  noise_value_week: Meassurement[],
}

export const BASE_URL = "https://api.corndex.de"
