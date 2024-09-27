import {createRef, useEffect, useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type MapComponentProps = {
  height?: string,
}

const MapComponent = ({height: initialHeight}: MapComponentProps) => {
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
    if (ref.current?.clientHeight) {
      setHeight(ref.current.clientHeight + "px")
    }
  }, [ref.current]);

  if (height === undefined) {
    return (<div ref={ref} className={"h-full w-full"}/>)
  }
  console.log(height)

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      style={{height: height ?? "500px", width: '100%'}}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>A pretty popup. Easily customizable.</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
