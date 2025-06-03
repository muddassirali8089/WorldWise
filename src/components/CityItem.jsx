
import React from "react";
import ReactCountryFlag from "react-country-flag";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../Contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { cityName, country, date , id  , position } = city;

  // Map country names to ISO country codes
  const countryCode = {
    Portugal: 'PT',
    Spain: 'ES',
    Germany: 'DE',
    France: 'FR',
    Italy: 'IT'
    
  }[country];
  const {currentCity} = useCities()
  return (
    <li >

      <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`}
       className={`${styles.cityItem} ${currentCity.id === id ? styles['cityItem--active'] : ""}`}>

      <span className={styles.emoji}>
        <ReactCountryFlag 
          countryCode={countryCode}
          svg
          style={{
            width: '0.8em',
            height: '0.8em',
            verticalAlign: 'none' 
          }}
        />
      </span>
      <h3 className={styles.cityName}>{cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn}>&times;</button>
            </Link>
    </li>
  );
}

export default CityItem;
// import React from "react";
// import styles from "./CityItem.module.css";

// const formatDate = (date) =>
//   new Intl.DateTimeFormat("en", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   }).format(new Date(date));

// function CityItem({ city }) {
//   const { cityName, emoji, date } = city;
//   return (
//     <li className={styles.cityItem}>
//       <span className={styles.emoji}>{emoji}</span>
//       <h3 className={styles.cityName}>{cityName}</h3>
//       <time className={styles.date}>{formatDate(date)}</time>
//       <button className={styles.deleteBtn}>&times;</button>
//     </li>
//   );
// }

// export default CityItem;