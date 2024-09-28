import {negative, neutral, positive} from "@/twind/config";

export const priceFactorToColor = (priceFactor: number): string  =>
{
  // const min = 0.7
  const normal = 1.0
  const bad = 1.5
  if (priceFactor < normal) {
    return positive
  }
  if (priceFactor < bad) {
    return neutral
  }
  return negative
}
