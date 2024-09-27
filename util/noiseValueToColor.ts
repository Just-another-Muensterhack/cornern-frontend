import {EaseFunctions} from "@/util/easeFunctions";
import {clamp} from "@/util/math";

type Color = {
  r: number,
  g: number,
  b: number
}

const defaultColors: Color[] = [
  {r: 0, g: 255, b: 0},
  {r: 255, g: 255, b: 0},
  {r: 255, g: 0, b: 0},
]

const easedColors = (color1: Color, color2: Color, combine: number): Color => {
  const usedCombine = EaseFunctions.easeInEaseOut(combine)
  const color2Combine = 1 - usedCombine
  const singleCombine = (n1: number, n2: number) => clamp(Math.round((n1 * usedCombine + n2 * (color2Combine))), 0, 255)

  console.log(combine, usedCombine, color2Combine, {
    r: singleCombine(color1.r, color2.r),
    g: singleCombine(color1.g, color2.g),
    b: singleCombine(color1.b, color2.b),
  })
  return {
    r: singleCombine(color1.r, color2.r),
    g: singleCombine(color1.g, color2.g),
    b: singleCombine(color1.b, color2.b),
  }
}

export const noiseValueToColor = (noiseValue: number) => {
  const okay = 50
  const max = 80
  if (noiseValue < okay) {
    return easedColors(defaultColors[0], defaultColors[1], noiseValue / okay)
  }
  return easedColors(defaultColors[1], defaultColors[2], (noiseValue - okay) / (max- okay))
}

export const colorToHex = (color: Color): string => {
  const toString = (value: number) => value.toString(16).padStart(2, "0")
  return `#${toString(color.r)}${toString(color.g)}${toString(color.b)}`
}
