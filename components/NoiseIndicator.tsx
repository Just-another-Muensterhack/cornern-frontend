import React from 'react';
import {clamp} from "@/util/math";
import {danger, primary} from "@/twind/config";

type NoiseSliceProps = {
  /**
   * 0 to 1
   */
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
          background: `linear-gradient(to right, ${color} ${useFillAmount >= 100 ? 100 : useFillAmount - 20}%, #00000000 ${useFillAmount <= 0 ? 0: useFillAmount + 20 }%)`,
          // background: `linear-gradient(to right, ${color} ${useFillAmount}%, #00000000 ${useFillAmount}%)`,
        }}
      />
    </div>
  );
};

type NoiseIndicatorProps = {
  value: number;
  /**
   * Cannot be 0
   */
  sliceCount: number;
  min?: number,
  max: number
};

export const NoiseIndicator = ({value, sliceCount, min = 0, max}: NoiseIndicatorProps) => {
  const minRotation = 312; // Starting rotation angle
  const maxRotation = 48; // Ending rotation angle
  const step = (minRotation - maxRotation) / (sliceCount - 1); // Step size between slices

  const radius = 120;

  const color =  value > 19/25 ? "danger" : "primary"

  return (
    <div
      style={{
        position: 'relative',
        width: `${2 * radius}px`,
        height: `${2 * radius}px`,
      }}
    >
      {Array.from({length: sliceCount}, (_, index) => {
        const rotation = maxRotation + index * step - 180;

        const angleInRadians = ((rotation - 90) * Math.PI) / 180; // Convert degrees to radians
        const fillValue = (value - index / sliceCount) * sliceCount
        const isSelected = fillValue <= 1 && fillValue >= 0

        const circleRadius = radius - (isSelected ? 24 : 30)
        const x = radius + circleRadius * Math.cos(angleInRadians);
        const y = radius + circleRadius * Math.sin(angleInRadians);

        const color =  index > 19 ? danger : primary
        const backgroundColor = index > 19 ? "#4F2F31" : undefined
        return (
          <div
            key={index}
            className={"absolute -translate-x-1/2 -translate-y-1/2"}
            style={{
              left: x,
              top: y
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
        <span className={`text-${color} text-2xl font-bold`}>{min + (value * (max - min))}</span>
        <span className={"text-white/40"}>db</span>
      </div>
    </div>
  );
};
