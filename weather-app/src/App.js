import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '5ba326cebfa91ac610bd1b7ae4dd48d8'; // Replace with your OpenWeatherMap API key

  const getWeather = async () => {
    if (city === '') return;
  
    // Use the encoded city name in the API request
    const encodedCity = encodeURIComponent(city);  // Encode the city name
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&units=metric&appid=${apiKey}`;
  
    try {
      const response = await axios.get(apiUrl);
      console.log(response.data);  // Log the response data
  
      if (response.data.cod !== 200) {
        setError('City not found');
        setWeather(null);
      } else {
        setWeather(response.data);
        setError('');
      }
    } catch (err) {
      console.log(err);  // Log any error
      setError('City not found');
      setWeather(null);
    }
  };
  

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {error && <p>{error}</p>}

      {weather && (
        <div>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
