import React from "react";
import ReactCountryFlag from "react-country-flag";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../Contexts/CitiesContext";
import countryCodeMap from "../CustomHooks/CountryCode"; // renamed for clarity
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { cityName, country, date, id, position } = city;

  const code = countryCodeMap[country?.trim()] || "";

  const { currentCity , deleteCity } = useCities();

  function handleClick(e){
    e.preventDefault();
    deleteCity(id)
  }
 
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>
          {code ? (
            <ReactCountryFlag
              countryCode={code}
              svg
              style={{
                width: "0.8em",
                height: "0.8em",
                verticalAlign: "none",
              }}
              title={country}
              aria-label={country}
            />
          ) : (
            "🌍"
          )}
        </span>
        <h3 className={styles.cityName}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}  onClick={handleClick}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
