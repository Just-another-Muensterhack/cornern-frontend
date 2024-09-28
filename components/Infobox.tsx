import React from 'react';
import { noiseValueToColor, colorToHex } from '@/util/noiseValueToColor';
import { Info } from 'lucide-react';

type DbIndicatorProps = {
  dbValue: number;
};

const Infobox: React.FC<DbIndicatorProps> = ({ dbValue }) => {
  const color = colorToHex(noiseValueToColor(dbValue));
  const dbTextThreshold = 40; // Threshold for the text to change

  return (
      <div className="flex justify-center items-center w-3/4 relative rounded-lg px-4 py-2" style={{ backgroundColor: color }}>
        <Info className="text-white-500 mr-4" size={32} />
        <div className="h-full flex-grow flex-col">
            {dbValue > dbTextThreshold ? (
                <>
                <div className="flex items-center h-1/2 text-xl text-white">
                    Erhöhte Lautstärke
                </div>
                <div className="flex items-center h-1/2 text-xs text-gray-250">
                    bitte Rücksicht nehmen
                </div>
                </>
            ) : (
                <>
                <div className="flex items-center h-1/2 text-xl text-white">
                    Angenehme Lautstärke
                </div>
                <div className="flex items-center h-1/2 text-xs text-gray-250">
                    genießt Euer Bier :)
                </div>
                </>
            )}
        </div>
      </div>
  );
};

export default Infobox;