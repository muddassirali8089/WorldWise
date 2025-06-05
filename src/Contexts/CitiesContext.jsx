// CitiesContext.jsx
import { useEffect, createContext, useContext, useReducer } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000";

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        loading: true,
      };

    case "cities/loaded":
      return {
        ...state,
        loading: false,
        cities: action.payload, // Fixed typo from 'cites' to 'cities'
      };

    case "city/loaded":
      return {
        ...state,
        loading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        loading: false,
        cities: [...state.cities, action.payload], // Fixed typo from 'cites' to 'cities'
      };

    case "city/deleted": // Changed to match the dispatch in deleteCity function
      return {
        ...state,
        loading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };

    case "rejected":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

const initialState = {
  cities: [],
  loading: false,
  currentCity: {},
  error: "",
};
function CitiesProvider({ children }) {
  const [{ cities, loading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setCities] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null); // Added error state
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error fetch the cities data",
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    if(Number(id) === currentCity.id) return
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error to get the city",
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
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
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error to create a city",
      });
    }
  }
async function deleteCity(id) {
  dispatch({ type: "loading" });
  try {
    await fetch(`${BASE_URL}/cities/${id}`, {
      method: "DELETE",
    });
    dispatch({ type: "city/deleted", payload: id }); // Changed to match reducer
  } catch {
    dispatch({
      type: "rejected",
      payload: "There was an error to delete a city", // Fixed error message
    });
  }
}

  return (
    <CitiesContext.Provider
      value={{
        cities,
        loading,
        error,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
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
