import React, { useState } from 'react';
import styles from './Map.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useCities } from '../Contexts/CitiesContext';
import ReactCountryFlag from 'react-country-flag';

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { cities } = useCities(); // Removed `country` – we now use per-city

  // Map from country names to ISO codes
  const countryCode = {
    Portugal: 'PT',
    Spain: 'ES',
    Germany: 'DE',
    France: 'FR',
    Italy: 'IT',
    // Add more countries if needed
  };

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <MapContainer className={styles.map} center={mapPosition} zoom={13} scrollWheelZoom={true}>
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
               
                <span style={{ marginLeft: '8px' }}>
                  <ReactCountryFlag
                    countryCode={countryCode1}
                    svg
                    style={{
                      width: '1.2em',
                      height: '1.2em',
                      verticalAlign: 'middle',
                      marginRight: "auto"
                    }}
                  />
                </span>

                 <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <button onClick={() => setSearchParams({ lat: 123, lng: "fghjk" })}>
        Get Location
      </button>
    </div>
  );
}

export default Map;
