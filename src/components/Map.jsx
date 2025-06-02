import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useCities } from "../Contexts/CitiesContext";
import ReactCountryFlag from "react-country-flag";
import { useGeolocation } from "../CustomHooks/useGeoLocation";
import Button from "./Button";

function Map() {

   const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [searchParams, setSearchParams] = useSearchParams();
  const {isLoading: isLoadingPosition , position:geolocationPosition , getPosition} = useGeolocation()
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");
  // Map from country names to ISO codes
  const countryCode = {
    Portugal: "PT",
    Spain: "ES",
    Germany: "DE",
    France: "FR",
    Italy: "IT",
    // Add more countries if needed
  };

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(function(){
      if(geolocationPosition){
        setMapPosition([geolocationPosition.lat , geolocationPosition.lng])
      }
  } , [geolocationPosition])
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <Button type="position" onClick={getPosition}>{
        isLoadingPosition ? "Loading.." : "USE YOUR POSITION"
        }</Button>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        //  center={mapLat && mapLng ? [mapLat , mapLng] : mapPosition }

        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {cities.map((city) => {
          const countryCode1 = countryCode[city.country]; // Get flag code

          return (
            <Marker
              key={city.id}
              position={[city.position.lat, city.position.lng]}
            >
              <Popup>
                <span style={{ marginLeft: "8px" }}>
                  <ReactCountryFlag
                    countryCode={countryCode1}
                    svg
                    style={{
                      width: "1.2em",
                      height: "1.2em",
                      verticalAlign: "middle",
                      marginRight: "auto",
                    }}
                  />
                </span>

                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}

        <ChangePosition position={mapPosition} />
        <DetectClick/>
      </MapContainer>

    
    </div>
  );
}

function ChangePosition({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick(){
const navigate = useNavigate();

  useMapEvents({
    
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    

} )

return null;
}
export default Map;
