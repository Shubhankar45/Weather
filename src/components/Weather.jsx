import React, { useState } from 'react';
import axios from 'axios';
import { WiThermometer, WiHumidity, WiStrongWind, WiDaySunny } from 'react-icons/wi';

const Weather = () => {
  const [city, setCity] = useState('Bhubaneswar');
  const [weather, setWeather] = useState(null);

  const myCity = (event) => {
    setCity(event.target.value);
  };

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c26b632208986d114d5ad68bac6afeba`
      );
      setWeather(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  const myWeather = () => {
    fetchWeather();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 via-pink-500 to-red-500 flex flex-col items-center justify-between text-white p-6">
      <h1 className="text-6xl font-bold mb-10 drop-shadow-lg text-white font-mono tracking-wide ">
        Weather App
      </h1>
      <div className="w-full max-w-md flex flex-col items-center bg-white bg-opacity-10 p-6 rounded-3xl shadow-2xl backdrop-blur-lg">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={myCity}
          className="w-full px-4 py-3 mb-4 text-black rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition ease-in-out duration-200"
        />
        <button
          type="button"
          onClick={myWeather}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-4 rounded-full transition-all duration-300 shadow-lg"
        >
          Find Weather
        </button>
      </div>

      {weather && (
        <div className="mt-10 w-full max-w-lg bg-white bg-opacity-30 backdrop-blur-md text-black p-8 rounded-3xl shadow-2xl">
          <h2 className="text-4xl font-semibold mb-4">{weather.name}, {weather.sys.country}</h2>
          <p className="text-xl mb-3 flex items-center">
            <WiThermometer className="text-4xl text-blue-500 mr-3" />
            Temperature: <span className="font-bold ml-2">{(weather.main.temp - 273.15).toFixed(2)}°C</span>
          </p>
          <p className="text-xl mb-3 flex items-center">
            <WiDaySunny className="text-4xl text-yellow-500 mr-3" />
            Feels Like: <span className="font-bold ml-2">{(weather.main.feels_like - 273.15).toFixed(2)}°C</span>
          </p>
          <p className="text-xl mb-3 flex items-center">
            <WiHumidity className="text-4xl text-teal-500 mr-3" />
            Humidity: <span className="font-bold ml-2">{weather.main.humidity}%</span>
          </p>
          <p className="text-xl flex items-center">
            <WiStrongWind className="text-4xl text-gray-500 mr-3" />
            Wind Speed: <span className="font-bold ml-2">{weather.wind.speed} m/s</span>
          </p>
        </div>
      )}
      
      <footer className="text-lg mt-10 text-center w-full">
        <p className="text-white opacity-80">Made By Shubh 😉</p>
      </footer>
    </div>
  );
};

export default Weather;
