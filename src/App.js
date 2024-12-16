import React, { useEffect, useState } from "react";
import { fetchWeatherByCity, fetchWeatherByLocation } from "./utils/api"; // Import correct functions
import WeatherDetails from "./components/WeatherDetails";
import "./App.css";

function App() {
  const [city, setCity] = useState(""); // Store city input
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const [weatherData, setWeatherData] = useState(null); // Store weather data for the searched city
  const [initialLocationWeather, setInitialLocationWeather] = useState(null); // Store weather data for initial location

  // Get user's location on initial load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Fetch weather data for the current location
            const data = await fetchWeatherByLocation(latitude, longitude);
            setInitialLocationWeather(data);
          } catch (error) {
            alert("Error fetching weather data for your location.");
          } finally {
            setLoading(false);
          }
        },
        async (error) => {
          console.error("Geolocation error:", error.message);
          // Fallback: Set default city if location fails
          try {
            const fallbackCity = "London"; // Default city in case geolocation fails
            const data = await fetchWeatherByCity(fallbackCity);
            setInitialLocationWeather(data);
          } catch (error) {
            alert("Error fetching weather data for the fallback city.");
          } finally {
            setLoading(false);
          }
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }, []);

  const handleSearch = async () => {
    if (city) {
      setLoading(true);
      try {
        // Fetch weather data for the searched city
        const data = await fetchWeatherByCity(city);
        setWeatherData(data); // Update weather data with searched city
      } catch (error) {
        alert("Error fetching weather data. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2>Weather</h2>
        <input
          type="text"
          placeholder="Search for cities"
          value={city}
          onChange={(e) => setCity(e.target.value)} // Update city state as user types
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="main-content">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading...</p>
          </div>
        ) : (
          <div>
            {/* Display weather data based on search or initial location */}
            {weatherData ? (
              <WeatherDetails weatherData={weatherData} searchCity={city} />
            ) : (
              initialLocationWeather && (
                <WeatherDetails weatherData={initialLocationWeather} searchCity={""} />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
