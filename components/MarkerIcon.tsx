import L from "leaflet";

type MarkerIconProps = {
  color?: string,
  scaleFactor: number
}

export const MarkerIcon = ({color = "red", scaleFactor}: MarkerIconProps) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div class="brightness-150 relative w-[40px] h-[52px] min-w-[40px] min-h-[52px]">
  <svg width="40" height="52" viewBox="0 0 40 52" xmlns="http://www.w3.org/2000/svg">
    <path fill="${color}" d="M20 0C31.05 0 40 8.95 40 20S20 52 20 52 0 31.05 0 20 8.95 0 20 0z"/>
    <circle cx="20" cy="20" r="15" fill="white"/>
  </svg>
  <div class="absolute text-[${color}] font-bold text-center top-[11px] w-full font-helvetica" style="filter: brightness(0.5)">
    ${scaleFactor.toFixed(1)}
  </div>
</div>`,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [1, -34],
  });
}
