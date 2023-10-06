import React, { useState } from "react";
import "./style.css";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState({
    celsius: "9",
    name: "London",
    humidity: "70",
    speed: "54",
    imag: '/images/rain.png',
  });
  const [name, setName] = useState("");

  const handelClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=16bfa98849718de13b6e8978b87d47b8&units=metric`;
      axios.get(apiUrl).then((res) => {
        let imagPath = "";
        if(res.data.weather[0].main =='Rain'){
          imagPath='/images/rain.png'
        }else if(res.data.weather[0].main =='Clear'){
          imagPath='/images/clear.png'
        }else if(res.data.weather[0].main =='Drizzle'){
          imagPath='/images/drizzle.png'
        }else if(res.data.weather[0].main =='Mist'){
          imagPath='/images/mist.png'
        }else if(res.data.weather[0].main =='Clouds'){
          imagPath='/images/clouds.png'
        }
        else {
          imagPath='/images/clouds.png'
        }

        console.log(res.data);
        setData({
          ...data,
          celsius: res.data.main.temp,
          name: res.data.name,
          humidity: res.data.main.humidity,
          speed: res.data.wind.speed,
          imag:imagPath,
        });
      });
    }
  };
  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            id='search'
            type="text"
            placeholder="Enter City Name"
            onChange={(e) => setName(e.target.value)}
          />
          <button>
            <img
              src="/images/search.png"
              onClick={handelClick}
              alt="search-icon"
            />
          </button>
        </div>
        <div className="winfo">
          <img src={data.imag} alt="" className="icon" />
          <h1>{Math.round(data.celsius)}ْc</h1>
          <h2>{data.name}</h2>

          <div className="details">
            <div className="col">
              <img src="/images/humidity.png" alt="" />
              <div className="humidity">
                <p>{Math.round(data.humidity)}%</p>
                <p>humidity</p>
              </div>
            </div>

            <div className="col">
              <img src="/images/wind.png" alt="" />
              <div className="wind">
                <p>{Math.round(data.speed)}km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
