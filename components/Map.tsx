import {createRef, useEffect, useState} from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Marker, MarkerProps, Position} from "@/components/Marker";

type MapComponentProps = {
  height?: string,
  markers?: MarkerProps[],
  center: Position,
  zoom: number
}

const MapComponent = ({height: initialHeight, markers, zoom, center}: MapComponentProps) => {
  const [height, setHeight] = useState(initialHeight)
  const ref = createRef<HTMLDivElement>()

  // This effect runs once when the component mounts
  useEffect(() => {
    // Fix for the default marker icon issue in Leaflet
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current?.clientHeight) {
        setHeight(ref.current.clientHeight + "px");
      } else {
        setTimeout(updateHeight, 100)
      }
    };

    updateHeight();

    window.addEventListener('resize', updateHeight);
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, [ref]);

  if (height === undefined) {
    return (<div ref={ref} className={"h-full w-full"}/>)
  }

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{height: height ?? "500px", width: '100%'}}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {(markers ?? []).map((value, index) => (
        <Marker
          key={index}
          position={value.position}
          onClick={value.onClick}
          iconColor={value.iconColor}
          priceFactor={value.priceFactor}
        >
          {value.children}
        </Marker>
      ))}
    </MapContainer>
  )
};

export default MapComponent
