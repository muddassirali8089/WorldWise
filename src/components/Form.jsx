import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUrlPosition } from "../CustomHooks/useUrlPosition";
import { useCities } from "../Contexts/CitiesContext";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";
import ReactCountryFlag from "react-country-flag";
import mycountryCode from "../CustomHooks/CountryCode";
import { useNavigate } from "react-router-dom";


const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {

  const{createCity , loading} = useCities();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [lat, lng] = useUrlPosition();
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const  navigate = useNavigate();


  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          setGeoCodingError("");
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          if (!data.countryCode)
            throw new Error("This is not a city, please click somewhere else");

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
        } catch (err) {
          setGeoCodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

 async function handleSubmit(e) {
  e.preventDefault();

  if (!cityName && !date) return;

  const code = mycountryCode[country?.trim()] || "";

  const newCity = {
    cityName,
    country,
    emogi: code, // Add the ISO country code
    date,
    notes,
    position: {
      lat,
      lng,
    },
  };
  await createCity(newCity)

  navigate("/app/cities")
}


  const code = mycountryCode[country?.trim()] || "";

  if (!lat && !lng) return <Message message="start clicking the map" />;
  if (isLoadingGeocoding) return <Spinner />;
  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form className={`${styles.form} ${loading ? styles.loading : ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />

        <span className={styles.flag}>
          {code ? (
            <ReactCountryFlag
              countryCode={code}
              svg
              style={{
                width: "1.2em",
                height: "1.2em",
              }}
              aria-label={country}
              title={country}
            />
          ) : (
            "🌍"
          )}
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        {/* <input
          
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}

        <DatePicker
          onChange={(date) => setDate(date)}
          id="date"
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
