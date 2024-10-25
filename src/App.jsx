import axios from 'axios'
import React, { useState } from 'react'

const App = () => {

   const [data, setData] = useState(null)
   const [isError, setIsError] = useState(false)
   const [isLoading, setIsLoading] = useState(false)
   const [city, setCity] = useState('')


   async function getWeather(e) {
      e.preventDefault()

      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      setIsLoading(true)

      try {
         const { data } = await axios.get(url)

         if (data) {
            setData(data)
            setIsError(false)
         }

      } catch (error) {
         setIsError(true)
         setData(null)
      } finally {
         setIsLoading(false)
         setCity('')
      }

   }

   return (
      <div className='container'>
         <h1>Weather App</h1>
         <form action="" onSubmit={getWeather}>
            <input
               type="text"
               id='city'
               value={city}
               onChange={(e) => { setCity(e.target.value) }}
               placeholder="Enter a city name"
               required
            />
            <button>Get Weather</button>
         </form>

         {data && (
            <div className='weather-display'>
               <h2>{data.name}</h2>
               <p>{data.weather[0].description}</p>
               <p>Temperature: {data.main.temp}°C</p>
               <p>Humidity: {data.main.humidity}%</p>
               <p>Wind Speed: {data.wind.speed}m/s</p>
            </div>
         )}


         {isLoading && <p className='loading-indicator'>Loading...</p>}
         {isError && <p className='error'>Oops! City not found, enter a valid city</p>}

      </div>
   )
}

export default App