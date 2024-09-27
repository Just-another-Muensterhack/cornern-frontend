import {Marker as LeafletMarker} from "react-leaflet";
import {noop} from "@/util/noop";
import {MarkerIcon} from "@/components/MarkerIcon";

export type Position = [number, number]

export type MarkerProps = {
  position: Position,
  /**
   * Color in hex
   */
  iconColor?: string,
  onClick?: () => void
}

export const Marker = ({position, iconColor, onClick = noop}: MarkerProps) => {
  return (
    <LeafletMarker
      position={position}
      eventHandlers={{
        click: onClick
      }}
      icon={MarkerIcon({color: iconColor})}
    />
  )
}

export default Marker
