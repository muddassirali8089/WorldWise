import React from "react";
import ReactCountryFlag from "react-country-flag";
import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  // Get ISO country code from country name
  const countryCodeMap = {
    Portugal: 'PT',
    Spain: 'ES',
    Germany: 'DE',
    France: 'FR',
    Italy: 'IT',
    // Add more countries as needed
  };

  const countryCode = countryCodeMap[country.country];

  return (
    <li className={styles.countryItem}>
      <span>
        <ReactCountryFlag
          countryCode={countryCode}
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
