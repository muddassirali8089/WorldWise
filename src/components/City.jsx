import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import ReactCountryFlag from "react-country-flag";
import { useCities } from "../Contexts/CitiesContext";
import { useEffect } from "react";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  // id to fetch the data
  // const [searchParams , setSearchParams] = useSearchParams();
  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng")
  // console.log(x.id);

  // const { cityName, emoji, date, notes } = currentCity;
  const { id } = useParams();

  const { currentCity, getCity  , loading} = useCities();

  useEffect(
    function () {
      getCity(id);
    },
    [id]
  );

  const { cityName, notes, date } = currentCity;
  const country = currentCity.country;

  const countryCode = {
    Portugal: "PT",
    Spain: "ES",
    Germany: "DE",
    France: "FR",
    Italy: "IT",
    // Add more countries as needed
  }[country];

  if (loading) return <Spinner/>

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>
            <ReactCountryFlag
              countryCode={countryCode}
              svg
              style={{
                width: "0.8em",
                height: "0.8em",
                verticalAlign: "none",
              }}
            />
          </span>
          {cityName}
        </h3>
      </div>


      

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton/>
      </div>
    </div>
  );
}

export default City;
