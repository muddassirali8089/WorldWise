// CitiesContext.jsx
import { useState, useEffect, createContext, useContext } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Added error state
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();

        setCities(data);
      } catch (err) {
        setError(err.message); // Set error message
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      setError(err.message); // Set error message
    } finally {
      setLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
    setCities(cities => [...cities , data])
    } catch (err) {
      setError(err.message); // Set error message
    } finally {
      setLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, loading, error, currentCity, getCity  , createCity}}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };
