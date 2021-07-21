import React, { useState, useEffect } from "react";
import {
	Input,
	Stack,
	InputLeftAddon,
	Icon,
	InputGroup,
	InputLeftElement,
	Button,
	Container,
	FormControl,
	Divider,
	useColorMode,
	VStack,
	IconButton,
} from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import "./App.css";
import axios from "axios";

import {
	SvgExcellent,
	SvgGood,
	SvgBad,
	SvgVeryBad,
	SvgTerrible,
	SvgThreatening,
} from "./Svg";

require("dotenv").config();

const Weather = () => {
	const [userCity, setCity] = useState("");
	const [userState, setState] = useState("");
	const [userWeather, setUserWeather] = useState([]);

	useEffect(() => {
		const currentWeather = localStorage.getItem("Weather-Obj");
		if (currentWeather) {
			setUserWeather(JSON.parse(currentWeather));
		}
	}, []);

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
						locationCity: userCity,
						locationState: userState,
						aqius: response.data.data.current.pollution.aqius,
						temperature: response.data.data.current.weather.tp,
						humidity: response.data.data.current.weather.hu,
					};
					localStorage.setItem(
						"Weather-Obj",
						JSON.stringify(weatherObj)
					);

					setUserWeather({
						locationCity: userCity,
						locationState: userCity,
						aqius: weatherObj.aqius,
						temperature: weatherObj.temperature,
						humidity: weatherObj.humidity,
					});
				});
		}
	};

	function airQualityImage() {
		if (userWeather.aqius <= 50) {
			return <SvgExcellent fill="#a2ef61" />;
		} else {
			if (userWeather.aqius >= 51 && userWeather.aqius <= 100) {
				return <SvgGood fill="#ffec50" />;
			} else {
				if (userWeather.aqius >= 101 && userWeather.aqius <= 150) {
					return <SvgBad fill="#ffb14c" />;
				} else {
					if (userWeather.aqius >= 151 && userWeather.aqius <= 200) {
						return <SvgVeryBad fill="#ff6275" />;
					} else {
						if (
							userWeather.aqius >= 201 &&
							userWeather.aqius <= 300
						) {
							return <SvgTerrible fill="#b36ebe" />;
						} else {
							return <SvgThreatening fill="#955476" />;
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
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<div id="contain-all">
			<VStack>
				<IconButton
					isRound={true}
					size="lg"
					alignSelf="flex-end"
					icon={<FaSun />}
					onClick={toggleColorMode}
				></IconButton>
			</VStack>
			<Container>
				<form>
					<Stack spacing={3}>
						<FormControl isRequired>
							<InputGroup>
								<InputLeftElement
									children={<Icon name="City" />}
								/>
								<Input
									type="city"
									placeholder="City"
									aria-label="City"
									onChange={onChangeHandlerCity}
									value={userCity}
								/>
							</InputGroup>
						</FormControl>

						<FormControl isRequired>
							<InputGroup>
								<InputLeftElement
									children={<Icon name="State" />}
								/>
								<Input
									type="state"
									placeholder="State"
									aria-label="State"
									onChange={onChangeHandlerState}
									value={userState}
								/>
							</InputGroup>
						</FormControl>
						<Divider />
						<Button variant="solid" onClick={apiFetch}>
							Check Quality
						</Button>
					</Stack>
				</form>

				<div>
					<h1>{userWeather.locationCity}</h1>
					{!userWeather.aqius ? (
						<div></div>
					) : (
						<div>
							<div>Air Quality: {userWeather.aqius}</div>
							<div>
								Temperature: {userWeather.temperature}c&deg;
							</div>
							<div>Humidity: {userWeather.humidity}%</div>
						</div>
					)}
				</div>
				<div>
					<div>{!userWeather.aqius ? null : airQualityImage()}</div>
				</div>
			</Container>
		</div>
	);
};

export default Weather;
