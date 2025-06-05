import React from "react";
import Spinner from "./Spinner.jsx";
import CountryItem from "./CountryItem.jsx";
import Message from "./Message.jsx";
import styles from './CountryList.module.css';
import { useCities } from "../Contexts/CitiesContext.jsx";

function CountryList() {
  const { cities, loading } = useCities();
  
  if (loading) return <Spinner />;

  // Get unique countries
  const countries = cities.reduce((acc, city) => {
    // Check if this country already exists in the accumulator
    if (!acc.some(item => item.country === city.country)) {
      acc.push({
        country: city.country,
        emoji: city.emoji,
        id: city.id // or use city.country as key if id isn't available
      });
    }
    return acc;
  }, []);

  if (!countries.length) 
    return <Message message="Add your first country by clicking on a city on the map" />;

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;