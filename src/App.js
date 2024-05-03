import './App.css';
import { useEffect, useState } from 'react';

function App() {
  
  const API_key = "";
  //const city_name = "Melbourne"
  const limit = 1
  const unit = "metric"
  //let lat, lon = getLatLon()

  async function getLatLon(){
    try{
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${area}&limit=${limit}&appid=${API_key}`)

      const json = await response.json()
      //return [json[0].lat, json[0].lon]
      setLat(json[0].lat)
      setLon(json[0].lon)
      //console.log(json[0].lat)

    }catch(err){
      console.log(err)
    }
  }

  async function getTodayWeather(){

    try{

      getLatLon()

      //console.log(lat)
      const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_key}`)

      const json = await response.json()
      //console.log(json)
      setTemp(Math.trunc(json.current.temp))
      setWeather(json.current.weather[0].description)

      const icon_url = `https://openweathermap.org/img/wn/${json.current.weather[0].icon}@2x.png`
      setWeatherIcon(icon_url)

    }catch(err){
      console.log(err)
    }
    finally{
      setIsLoading(false)
    }

  }
  
  const [area, setArea] = useState("Melbourne")
  const [temp, setTemp] = useState("") //celcius, string
  const [weather, setWeather] = useState("") //weather description
  const [weatherIcon, setWeatherIcon] = useState("") //icon string
  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    getTodayWeather()
  },[area])

  return (
    <div className="App">
      {
        !isLoading && (
          <>
            <p>
            <select value={area} onChange={e=>setArea(e.target.value)} default="Melbourne">
              <option value="Canberra">Canberra</option>
              <option value="Sydney">Sydney</option>
              <option value="Melbourne">Melbourne</option>
              <option value="Adelaide">Adelaide</option>
            </select>
            </p>
            <img src={weatherIcon} alt='weather-icon'/>
            <p>{temp} °C</p>
            <p>{weather}</p>
          </>)
      }
    </div>
  );
}

export default App;
