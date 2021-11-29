import React, { Component } from "react";
import "./App.css";
import Form from "./Form";
import Result from "./Result";
import Imieniny from "./Imieniny";
//Klucz do API

const APIKey = process.env.REACT_APP_API_KEY;

class App extends Component {
  state = {
    value: "",
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    temp: "",
    pressure: "",
    wind: "",
    country: "",
    err: false,
    dateClock: new Date(),
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState({ dateClock: new Date() });
  }

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value.toUpperCase(),
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.value.length === 0) return;
    if (prevState.value !== this.state.value) {
      const API = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIKey}&units=metric`;
      console.log(API);
      fetch(API)
        .then((response) => {
          if (response.ok) {
            return response;
          }
          throw Error("nie udało się");
        })
        .then((response) => response.json())
        .then((data) => {
          const time = new Date().toLocaleString();
          this.setState((prevState) => ({
            err: false,
            date: time,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            temp: data.main.temp.toFixed(0),
            pressure: data.main.pressure,
            wind: data.wind.speed,
            city: prevState.value,
            country: data.sys.country,
          }));
        })
        .catch((err) =>
          this.setState((state) => ({
            err: true,
            city: state.value,
          }))
        );
    }
  }

  render() {
    return (
      <div className="App">
        <div className="app-container">
          <Form value={this.state.value} change={this.handleInputChange} />
          <Result className="result" weather={this.state} />
          <div className="infoBar">
            <span>{this.state.dateClock.toLocaleString()}</span>
          </div>
          <div className="imieniny">
            <Imieniny />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
