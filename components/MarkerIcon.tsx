import L from "leaflet";

type MarkerIconProps = {
  color?: string,
  scaleFactor: number
}

export const MarkerIcon = ({color = "red", scaleFactor}: MarkerIconProps) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div class="brightness-150 relative w-[29px] h-[45px] min-w-[29px] min-h-[45px]">
        <svg width="29" height="45" viewBox="0 0 29 45" xmlns="http://www.w3.org/2000/svg">
          <path fill=${color} d="M14.5 0C22.75 0 29 6.25 29 14.5c0 10.25-14.5 28.5-14.5 28.5S0 24.75 0 14.5C0 6.25 6.25 0 14.5 0z"/>
          <circle cx="14.5" cy="14.5" r="11.5" fill="white"/>
        </svg>
        <div class="absolute text-[${color}] font-black text-center top-[6px] w-full text-xs font-mono">${scaleFactor.toFixed(1)}</div>
      </div>`,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [1, -34],
  });
}
