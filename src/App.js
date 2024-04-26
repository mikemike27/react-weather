import './App.css';
import { useEffect, useState } from 'react';

function App() {
  
  const API_key = "2f98716aee1d9bd976288b46dea67a9d";
  const city_name = "Melbourne"
  const limit = 1
  const unit = "metric"
  //let lat, lon = getLatLon()

  async function getLatLon(){
    try{
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=${limit}&appid=${API_key}`)

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
      setTemp(json.current.temp)
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
  
  const [temp, setTemp] = useState("") //celcius, string
  const [weather, setWeather] = useState("") //weather description
  const [weatherIcon, setWeatherIcon] = useState("") //icon string
  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    getTodayWeather()
  },[])

  return (
    <div className="App">
      {
        !isLoading && (
          <>
            <p>{city_name}</p>
            <img src={weatherIcon} />
            <p>{temp} °C</p>
            <p>{weather}</p>
          </>)
      }
    </div>
  );
}

export default App;
