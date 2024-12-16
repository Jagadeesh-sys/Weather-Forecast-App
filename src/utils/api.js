// Example of fetching weather data for a city
const API_KEY = '65a0b3f779fe75e4930a29b3a2f1f186';  // Replace with your OpenWeatherMap API key

export const fetchWeatherByCity = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data for city:", error);
    throw error;
  }
};

// Example of fetching weather data by latitude and longitude (current location)
export const fetchWeatherByLocation = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Error fetching weather data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data for location:", error);
    throw error;
  }
};
