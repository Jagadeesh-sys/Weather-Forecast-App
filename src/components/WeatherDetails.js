import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/WeatherDetails.css";
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiDayFog, WiHumidity, WiStrongWind } from "react-icons/wi";

const WeatherDetails = ({ weatherData, searchCity }) => {
  const [loading, setLoading] = useState(false);
  const { city, list } = weatherData || {};

  // Always call useEffect first, before any conditional logic or early returns
  useEffect(() => {
    if (weatherData) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [weatherData]);

  // Handle if no weather data is available
  if (!weatherData) {
    return <p>No weather data available for {searchCity}</p>;
  }

  const todayForecast = list.slice(0, 8); // Today's forecast (first 8 hours)
  const dailyForecast = list.filter((_, index) => index % 8 === 0); // 7-day forecast

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case "Clear":
        return <WiDaySunny color="#f9d71c" size={50} />;
      case "Clouds":
        return <WiCloudy color="#a4b0be" size={50} />;
      case "Rain":
        return <WiRain color="#3742fa" size={50} />;
      case "Snow":
        return <WiSnow color="#dfe4ea" size={50} />;
      default:
        return <WiDayFog color="#57606f" size={50} />;
    }
  };

  const chanceOfRain = Math.round(todayForecast[0]?.pop * 100) || 0;
  const { coord } = city;

  if (loading) {
    return <p>Loading weather data...</p>;
  }

  return (
    <div className="weather-container">
      {/* Main Weather Info */}
      <div className="main-info">
        <h1>{city.name}</h1>
        <h2>{Math.round(todayForecast[0].main.temp)}°</h2>
        <div className="icon">{getWeatherIcon(todayForecast[0].weather[0].main)}</div>
        <p>Chance of rain: {chanceOfRain}%</p>

        <div className="extra-info">
          <div className="info-item">
            <WiHumidity color="#70a1ff" size={40} />
            <p>Humidity: {todayForecast[0].main.humidity}%</p>
          </div>
          <div className="info-item">
            <WiStrongWind color="#2f3542" size={40} />
            <p>Wind: {Math.round(todayForecast[0].wind.speed)} m/s</p>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="map-container">
        <h3>City Location</h3>
        <MapContainer
          center={[coord.lat, coord.lon]}
          zoom={12}
          style={{ height: "300px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[coord.lat, coord.lon]}>
            <Popup>{city.name}</Popup>
          </Marker>
          <CircleMarker
            center={[coord.lat, coord.lon]}
            radius={6}
            fillColor="blue"
            color="blue"
            fillOpacity={0.7}
          >
            <Popup>Your Current Location</Popup>
          </CircleMarker>
        </MapContainer>
      </div>

      {/* Hourly Forecast */}
      <div className="hourly-forecast">
        <h3>Today's Forecast</h3>
        <div className="hourly-cards">
          {todayForecast.map((item, index) => (
            <div key={index} className="hour-card">
              <p>{new Date(item.dt_txt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              {getWeatherIcon(item.weather[0].main)}
              <p>{Math.round(item.main.temp)}°</p>
              <p>Rain: {Math.round(item.pop * 100)}%</p>
              <p>Humidity: {item.main.humidity}%</p>
              <p>Wind: {Math.round(item.wind.speed)} m/s</p>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Forecast */}
      <div className="weekly-forecast">
        <h3>7-Day Forecast</h3>
        <div className="weekly-cards">
          {dailyForecast.map((item, index) => (
            <div key={index} className="day-card">
              <p>{new Date(item.dt_txt).toLocaleDateString([], { weekday: "short" })}</p>
              {getWeatherIcon(item.weather[0].main)}
              <p>{Math.round(item.main.temp)}°</p>
              <p>Rain: {Math.round(item.pop * 100)}%</p>
              <p>Humidity: {item.main.humidity}%</p>
              <p>Wind: {Math.round(item.wind.speed)} m/s</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
