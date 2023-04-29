import { useMemo, useRef, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
const baseUrl =
  "https://us-central1-arduinogasproject.cloudfunctions.net/app/api/KeyA20222023/getData";

let lat = 19.020493;
let lon = 72.871292;

export default function Location() {
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  // });

  // lat = Number(data.lat);
  // lon = Number(data.lon);

  // if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: lat, lng: lon }), []);
  const [data, setData] = useState({
    co2: [],
    dust: [],
    epoch: [],
    eth: [],
    h2: [],
    hum: [],
    lat: "",
    lon: "",
    mq135: [],
    o3: [],
    temp: [],
    voc: [],
  });

  const getData = async () => {
    await axios.get(baseUrl).then((response) => {
      setData(response.data);
      lat = Number(response.data.lat);
      lon = Number(response.data.lon);
    });
  };
  useEffect(() => getData(), []);
  console.log(data);
  console.log(data.lat, data.lon);
  const mapRef = useRef(null);
  useEffect(() => {
    // Access the map instance with mapRef.current
    console.log(mapRef.current);
  }, []);

  return (
    <div style={{ width: "100%" }}>
      {/* <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
      >
        <Marker position={center} />
      </GoogleMap> */}
      <MapContainer center={[data.lat, data.lon]} zoom={13} ref={mapRef}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
        />
        <Marker position={[51.5, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
