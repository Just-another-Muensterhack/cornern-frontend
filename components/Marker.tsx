import {Marker as LeafletMarker, Popup} from "react-leaflet";
import {noop} from "@/util/noop";
import {MarkerIcon} from "@/components/MarkerIcon";
import {PropsWithChildren} from "react";

export type Position = [number, number]

export type MarkerProps = PropsWithChildren<{
  position: Position,
  /**
   * Color in hex
   */
  iconColor?: string,
  onClick?: () => void
}>

export const Marker = ({position, iconColor, onClick = noop, children}: MarkerProps) => {
  return (
    <LeafletMarker
      position={position}
      eventHandlers={{
        click: onClick
      }}
      icon={MarkerIcon({color: iconColor})}
    >
      <Popup>
        {children}
      </Popup>
    </LeafletMarker>
  )
}
