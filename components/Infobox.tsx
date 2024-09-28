import React from 'react';
import {noiseValueToColor, colorToHex} from '@/util/noiseValueToColor';
import {Info} from 'lucide-react';
import {tx} from "@twind/core";

type DbIndicatorProps = {
  dbValue: number;
  className?: string
};

const Infobox: React.FC<DbIndicatorProps> = ({dbValue, className}) => {
  const color = colorToHex(noiseValueToColor(dbValue));
  const dbTextThreshold = 40; // Threshold for the text to change
  const isAboveThreshold = dbValue > dbTextThreshold
  return (
    <div
      className={tx("flex flex-col w-full gap-x-4 rounded-lg px-4 pt-2 pb-3 text-white", {
        "!text-black": dbValue < 60,
      }, className)}
      style={{backgroundColor: color}}
    >
      <div className={"flex flex-row items-center gap-x-2"}>
        <Info size={20} className={"translate-y-[2px]"}/>
        <span className="text-xl font-semibold">
          {isAboveThreshold ? "Erhöhte Lautstärke" : "Angenehme Lautstärke"}
      </span>
      </div>
      <span className={"text-xs ml-8 opacity-90"}>
          {isAboveThreshold ? "Bitte Rücksicht nehmen" : "Genießt Euer Bier :)"}
        </span>
    </div>
  );
};

export default Infobox;
