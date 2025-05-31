import React from "react";
import Spinner from "./Spinner.jsx";
import CountryItem from "./CountryItem.jsx";
import Message from "./Message.jsx"
import styles from './CountryList.module.css'
import { useCities } from "../Contexts/CitiesContext.jsx";

function CountryList() {


  const {cities, isLoading }  = useCities();
  if (isLoading) return <Spinner />;

  
  


const countries = cities.reduce((acc, curr) => {
  // Check if this cityName already exists in the accumulator
  const isAlreadyIncluded = acc.some(city => city.cityName === curr.cityName);

  if (!isAlreadyIncluded) {
    acc.push(curr); // Only push if it's a unique city name
  }

  return acc;
}, []);

if(!countries.length) return <Message message = "Add your first country by clicking on a city in a map"/>
  return (
    <ul className={styles.countryList}>
   
      {countries.map((country) => (
        <CountryItem  key={country.country} country={country}  />
      ))}
    </ul>
  );
}

export default CountryList;
