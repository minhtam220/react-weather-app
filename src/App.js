import React, {useState,useEffect} from "react";
import './App.css';

const api = {
  key: "c1977489aa67fc8f2d9b1a78cd13dd4f",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {

  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage,setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);

  }

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      //Process
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          //console.log(JSON.stringify(data));
          setWeatherInfo(
           `City: ${data.name},
            Country: ${data.sys.country},
            Temp: ${data.main.temp} degree,
            Weather: ${data.weather[0].description},` 
          );
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
        
      } catch (error) {
        setErrorMessage(error.message)
      }
      setLoading(false);

    };

    fetchWeatherData();

  },[searchCity]);

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input 
      type="text" 
      placeholder="City" 
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}/>
      <button>Search</button>
    </form>
    {loading ? (
      <div>Loading ...</div>
    ) : (
      <>
      {errorMessage ? (
        <div style={{color:"red"}}>{errorMessage}</div>
      ) : (
        <div>{weatherInfo}</div>
      )}
      </>
    )}
    </>
  );
}

export default App;
