import React from 'react';
import styles from './Map.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      Map<br />
      Position: {lat}, {lng}
      <br />
      <button onClick={() => setSearchParams({ lat: 123, lng: "fghjk" })}>
        Get Location
      </button>
    </div>
  );
}

export default Map;
