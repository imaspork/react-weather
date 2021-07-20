import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import excellent from "../src/excellent.svg";
import good from "../src/good.svg";
import bad from "../src/bad.svg";
import veryBad from "../src/veryBad.svg";
import terrible from "../src/terrible.svg";
import threatening from "../src/threatening.svg";
require("dotenv").config();

const Weather = () => {
	const [userCity, setCity] = useState("");
	const [userState, setState] = useState("");
	const [userWeather, setUserWeather] = useState([]);
	const onChangeHandlerCity = (event) => {
		event.preventDefault();
		setCity(event.target.value);
	};
	const onChangeHandlerState = (event) => {
		event.preventDefault();
		setState(event.target.value);
	};
	const apiFetch = () => {
		if (userCity.length === 0 || userState.length === 0) {
			console.log("Please enter a valid city");
		} else {
			axios
				.get(
					`http://api.airvisual.com/v2/city?city=${userCity}&state=${userState}&country=USA&key=${process.env.REACT_APP_API_KEY}`
				)
				.then((response) => {
					let weatherObj = {
						location: `${userCity}, ${userState}`,
						aqius: response.data.data.current.pollution.aqius,
						temperature: response.data.data.current.weather.tp,
						humidity: response.data.data.current.weather.hu,
					};
					localStorage.setItem(
						"Weather-Obj",
						JSON.stringify(weatherObj)
					);

					setUserWeather({
						aqius: weatherObj.aqius,
						temperature: weatherObj.temperature,
						humidity: weatherObj.humidity,
					});
				});
		}
	};

	function airQualityImage() {
		if (userWeather.aqius <= 50) {
			return excellent;
		} else {
			if (userWeather.aqius >= 51 && userWeather.aqius <= 100) {
				return good;
			} else {
				if (userWeather.aqius >= 101 && userWeather.aqius <= 150) {
					return bad;
				} else {
					if (userWeather.aqius >= 151 && userWeather.aqius <= 200) {
						return veryBad;
					} else {
						if (
							userWeather.aqius >= 201 &&
							userWeather.aqius <= 300
						) {
							return terrible;
						} else {
							return threatening;
						}
					}
				}
			}
		}
	}
	function airQualityText() {
		if (userWeather.aqius <= 50) {
			return "excellent";
		} else {
			if (userWeather.aqius >= 51 && userWeather.aqius <= 100) {
				return "good";
			} else {
				if (userWeather.aqius >= 101 && userWeather.aqius <= 150) {
					return "bad";
				} else {
					if (userWeather.aqius >= 151 && userWeather.aqius <= 200) {
						return "veryBad";
					} else {
						if (
							userWeather.aqius >= 201 &&
							userWeather.aqius <= 300
						) {
							return "terrible";
						} else {
							return "threatening";
						}
					}
				}
			}
		}
	}
	return (
		<div id="contain-all" className={airQualityText()}>
			<div id="form-container">
				<form onSubmit>
					<label id="label">
						City:
						<input
							type="text"
							placeholder="Your City"
							onChange={onChangeHandlerCity}
							value={userCity}
						/>
					</label>
					<label>
						State:
						<input
							type="text"
							placeholder="Your State"
							onChange={onChangeHandlerState}
							value={userState}
						/>
					</label>
				</form>
				<button onClick={apiFetch}>Check Weather Quality</button>
			</div>
			<div>
				{!userWeather.aqius ? (
					<div></div>
				) : (
					<div>
						<div>Air Quality: {userWeather.aqius}</div>
						<div>Temperature: {userWeather.temperature}c&deg;</div>
						<div>Humidity: {userWeather.humidity}%</div>
					</div>
				)}
			</div>
			<div>
				<img src={!userWeather.aqius ? null : airQualityImage()}></img>
			</div>
		</div>
	);
};

export default Weather;
