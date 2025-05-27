import React from 'react'
import styles from './Map.module.css'
import { useSearchParams } from 'react-router-dom';

function Map() {

  const [searchParams , setSearchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng")
  return (
    <div className={styles.mapContainer}>Map

    position {lat}{lng}
    <button  onClick={() => setSearchParams({lat: 123 , lng :"fghjk"})}>getlocation</button>
    </div>
  )
}

export default Map