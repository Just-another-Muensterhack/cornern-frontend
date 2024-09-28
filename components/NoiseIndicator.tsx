import React from 'react';
import {clamp} from "@/util/math";
import {danger, primary} from "@/twind/config";

type NoiseSliceProps = {
  fillAmount: number,
  larger?: boolean,
  backgroundColor?: string,
  color: string,
  rotation: number
};

export const NoiseSlice = ({
                             fillAmount,
                             larger = false,
                             backgroundColor = "#4F5252",
                             color,
                             rotation
                           }: NoiseSliceProps) => {
  const useFillAmount = clamp(fillAmount * 100, 0, 100);
  return (
    <div
      className="rounded overflow-hidden"
      style={{
        backgroundColor,
        height: larger ? "36px" : "24px",
        width: "10px",
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div
        className="w-full h-full"
        style={{
          background: `linear-gradient(to right, ${color} ${useFillAmount >= 100 ? 100 : useFillAmount - 20}%, #00000000 ${useFillAmount <= 0 ? 0 : useFillAmount + 20}%)`,
        }}
      />
    </div>
  );
};

type NoiseIndicatorProps = {
  percentage: number;
  /**
   * Cannot be 0
   */
  sliceCount: number;
  min?: number,
  max: number,
  size?: number
};

export const NoiseIndicator = ({percentage, sliceCount, min = 0, max, size = 250}: NoiseIndicatorProps) => {
  const value = percentage / 100;
  const minRotation = 312; // Starting rotation angle
  const maxRotation = 48; // Ending rotation angle
  const step = (minRotation - maxRotation) / (sliceCount - 1); // Step size between slices

  const radius = size / 2;

  const color = value > 19 / 25 ? "danger" : "primary"

  return (
    <div
      className={`relative !w-[${2 * radius}px] !h-[${2 * radius}px] min-w-[${2 * radius}px] min-h-[${2 * radius}px]`}>
      {Array.from({length: sliceCount}, (_, index) => {
        const rotation = maxRotation + index * step - 180;

        const angleInRadians = ((rotation - 90) * Math.PI) / 180; // Convert degrees to radians
        const fillValue = (value - index / sliceCount) * sliceCount
        const isSelected = fillValue <= 1 && fillValue >= 0

        const circleRadius = radius - (isSelected ? 18 : 24)
        const x = radius + circleRadius * Math.cos(angleInRadians);
        const y = radius + circleRadius * Math.sin(angleInRadians);

        const color = index > 19 ? danger : primary
        const backgroundColor = index > 19 ? "#4F2F31" : undefined
        return (
          <div
            key={index}
            className={`absolute -translate-x-1/2 -translate-y-1/2`}
            style={{
              left: x,
              top: y,
              opacity: clamp(40 + index * 10, 0, 100) / 100
            }}
          >
            <NoiseSlice
              fillAmount={fillValue}
              larger={isSelected}
              rotation={rotation}
              backgroundColor={backgroundColor}
              color={color}
            />
          </div>
        );
      })}
      <div className={"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"}>
        <span className={`text-${color} text-4xl font-bold`}>{(min + (value * (max - min))).toFixed(1)}</span>
        <span className={"text-white/40 text-lg"}>db</span>
      </div>
    </div>
  );
};
