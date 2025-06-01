import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useCities } from "../Contexts/CitiesContext";
import ReactCountryFlag from "react-country-flag";

function Map() {
  const navigate = useNavigate();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { cities } = useCities(); // Removed `country` – we now use per-city

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
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
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
      </MapContainer>

      <button onClick={() => setSearchParams({ lat: 123, lng: 456789 })}>
        Get Location
      </button>
    </div>
  );
}

function ChangePosition({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
export default Map;
