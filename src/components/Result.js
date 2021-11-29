import React from "react";
import "./App.css";

const Result = (props) => {
  const { city, sunrise, sunset, temp, pressure, wind, country, err } =
    props.weather;

  let content = null;
  if (!err && city) {
    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();

    content = (
      <div>
        <h3>
          Informacje pogodowe dla:
          <br />
          <br />
          <em>
            {city}, {country}
          </em>
        </h3>
        <div className="temp">
          <h4>
            Aktualna temperatura:
            <br />
            <span>{temp} &#176;C</span>
          </h4>
        </div>
        <div className="weatherDetails">
          <div className="oneDetail">
            <h4>Wschód słońca:</h4>
            <span>{sunriseTime}</span>
          </div>
          <div className="oneDetail">
            <h4>Zachód słońca:</h4>
            <span>{sunsetTime}</span>
          </div>
        </div>
        <div className="weatherDetails">
          <div className="oneDetail">
            <h4>Ciśnienie:</h4>
            <span>{pressure} hPa</span>
          </div>
          <div className="oneDetail">
            <h4>Prędkość wiatru:</h4>
            <span>{wind} m/s</span>
          </div>
        </div>
      </div>
    );
  }

  const classes = ["result"];
  if (!err && city) {
    if (temp < 1) classes.push("snow");
    if (temp > 15) classes.push("sunny");
    if (temp >= 1 && temp <= 15) classes.push("cloudy");
  }
  const beforeContent = `OCZEKIWANIE NA DANE...`;

  return (
    <div className={classes.join(" ")}>
      {err ? <p className="beforeContent">{beforeContent}</p> : content}
    </div>
  );
};

export default Result;
