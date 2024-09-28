import React from 'react';
import {Info} from 'lucide-react';
import {tx} from "@twind/core";
import {decibelToColor, decibelToNoiseState} from "@/util/noiseCalc";

type DbIndicatorProps = {
  db: number;
  className?: string
};

const Infobox = ({db, className}: DbIndicatorProps) => {
  const color = decibelToColor(db);
  const isAboveThreshold = decibelToNoiseState(db) !== "silent"

  return (
    <div
      className={tx("flex flex-col w-full gap-x-4 rounded-lg px-4 pt-2 pb-3 text-white", {
        "!text-black": decibelToNoiseState(db) !== "loud",
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
