import React ,{useState , useEffect} from "react";
import "../style.css";
import Weathercard from "./Weathercard";

const Code = () => {
const [searchValue, setSearchValue] = useState("delhi");
const [tempInfo, setTempInfo] = useState({});

const getWeatherInfo = async () =>
{
try
{
let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=32909cb137e7e43fd288d514b88c62a6`;

const res = await fetch(url);
const data = await res.json();

const {temp , pressure , humidity} = data.main;
const{main:weathermood} = data.weather[0];
const{name} = data;
const{speed} = data.wind;
const{country,sunset} = data.sys;

const myNewWeatherInfo = {
  temp,
  pressure,
  humidity,
  weathermood,
  name,
  speed,
  country,
  sunset
}
setTempInfo(myNewWeatherInfo);
}
catch(error)
{
  console.log(error);
}
}

useEffect(() => {
 getWeatherInfo();
}, [])
  return (
    <div>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="Search...."
            autoFocus
            id="search"
            className="searchTerm"
            value ={searchValue}
            onChange = {(e) => setSearchValue(e.target.value)}
          />

          <button className="searchButton" type="button" onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>

      {/* card template */}

     <Weathercard tempInfo = {tempInfo}/>
    </div>
  );
};

export default Code;
