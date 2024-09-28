import {negative, neutral, positive} from "@/twind/config";

export type NoiseState = "silent" | "normal" | "loud"

export const decibelToNoiseState = (value: number): NoiseState => {
  // Thresholds
  if(value < 55) {
    return "silent"
  }
  if(value < 75) {
    return "normal"
  }
  return "loud"
}

export const decibelToColor = (value: number): string => {
  const mapping: Record<NoiseState, string> = {
    silent: positive,
    normal: neutral,
    loud: negative,
  }
  return mapping[decibelToNoiseState(value)]
}
