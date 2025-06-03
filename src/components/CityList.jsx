import React from "react";
import Spinner from "./Spinner.jsx";
import CityItem from "./CityItem.jsx";
import Message from "./Message.jsx"
import styles from "./CityList.module.css";
import { useCities } from "../Contexts/CitiesContext.jsx";

function CityList() {

  const {cities, loading} = useCities()
  if (loading) return <Spinner />;
  if(!cities.length) return <Message message = "Add your first city by clicking on a city in a map"/>

  return (
    <ul className={styles.cityList}>
   
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
