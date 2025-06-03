import React from "react";
import ReactCountryFlag from "react-country-flag";
import styles from "./CountryItem.module.css";
import countryCode from "../CustomHooks/countryCode.js"
function CountryItem({ country }) {
  // Get ISO country code from country name



  const countryCode1 = countryCode[country.country];

  return (
    <li className={styles.countryItem}>
      <span>
        <ReactCountryFlag
          countryCode={countryCode1}
          svg
          style={{
            width: '1em',
            height: '1em',
            marginRight: '0.5rem',
            verticalAlign: 'none'
          }}
        />
      </span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
