import React, {useState, useEffect} from 'react';
import {useNextPriceUpdate} from "@/api/useNextPriceUpdate";
import {tx} from "@twind/core";

const PriceUpdateBar: React.FC = () => {
  const [progress, setProgress] = useState(0)

  const {minutes, next} = useNextPriceUpdate()

  useEffect(() => {
    const animate = (() => {
      const progress = 1 - (next.getTime() - Date.now()) / 1000 / 60 / minutes
      if(progress >= 1) {
        return
      } else {
        setProgress(progress)
      }
      requestAnimationFrame(animate)
    })

    const id = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(id)
  }, [minutes, next]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const time = formatTime(Math.round(minutes * 60 * (1 - progress)))

  return (
    <div className="flex flex-col justify-center items-center w-full gap-y-4">
      <h1 className={"text-lg font-bold"}>Nächstes Preis Update</h1>
      <div className="w-full bg-gray-200 h-9 relative rounded-full">
        <div className="rounded-full h-7 m-1 overflow-hidden">
          <div className={`flex flex-row justify-end items-center h-full bg-primary rounded-full text-white pr-4`} style={{width: `${ (progress) * 100}%`}}>
            <span>{progress > 0.2 && time}</span>
          </div>
        </div>
        <div className={tx("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg text-black ", {"opacity-0" : progress > 0.2})}>
          {time}
        </div>
      </div>
    </div>
  );
};

export default PriceUpdateBar;
