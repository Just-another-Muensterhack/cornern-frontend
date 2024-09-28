import L from "leaflet";
import {colorToHex, priceFactorToColor} from "@/util/noiseValueToColor";

type MarkerIconProps = {
  color?: string,
  scaleFactor: number
}

export const MarkerIcon = ({color = "red", scaleFactor}: MarkerIconProps) => {
  const colorHex = colorToHex(priceFactorToColor(scaleFactor))
  return L.divIcon({
    className: 'custom-marker',
    html: `<div class="relative w-[25px] h-[41px] min-w-[25px] min-h-[41px]">
<svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
           <path fill=${color} d="M12.5 0C19.75 0 25 5.25 25 12.5c0 10.25-12.5 28.5-12.5 28.5S0 22.75 0 12.5C0 5.25 5.25 0 12.5 0z"/>
           <circle cx="12.5" cy="12.5" r="9" fill="white"/>
         </svg>
         <div class="absolute text-[${colorHex}] text-center top-[5px] w-full text-xs">${scaleFactor.toFixed(1)}</div>
</div>`,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [1, -34],
  });
}
