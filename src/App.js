import React, { useState } from "react";

import "./App.css";
import axios from "axios";
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
					setUserWeather({
						aqius: response.data.data.current.pollution.aqius,
						temperature: response.data.data.current.weather.tp,
						humidity: response.data.data.current.weather.hu,
					});
				});
		}
	};
	// currently first call does not work because react fetches the info before it's set in state - look into adding .5 to 1 second delay
	return (
		<div id="contain-all">
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
					<div>loading... </div>
				) : (
					<div>
						<div>{userWeather.aqius}</div>
						<div>{userWeather.temperature}</div>
						<div>{userWeather.humidity}</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Weather;
