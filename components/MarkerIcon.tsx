import L from "leaflet";

type MarkerIconProps = {
  color?: string
}

export const MarkerIcon = ({color = "red"}: MarkerIconProps) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
           <path fill=${color} d="M12.5 0C19.75 0 25 5.25 25 12.5c0 10.25-12.5 28.5-12.5 28.5S0 22.75 0 12.5C0 5.25 5.25 0 12.5 0z"/>
           <circle cx="12.5" cy="12.5" r="9" fill="white"/>
         </svg>`,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [1, -34],
  });
}
