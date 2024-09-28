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
  priceFactor: number,
  onClick?: () => void
}>

export const Marker = ({position, iconColor, onClick = noop, children, priceFactor}: MarkerProps) => {
  return (
    <LeafletMarker
      position={position}
      eventHandlers={{
        click: onClick
      }}
      icon={MarkerIcon({color: iconColor, scaleFactor: priceFactor})}
    >
      <Popup>
        {children}
      </Popup>
    </LeafletMarker>
  )
}
