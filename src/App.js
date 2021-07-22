import React, { useState, useEffect } from "react";
import {
	Input,
	Stack,
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
	Text,
	Flex,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
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
	const [fetchStatus, setFetchStatus] = useState("success");

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
			setFetchStatus("false");
			console.log(fetchStatus);
		} else {
			axios
				.get(
					`http://api.airvisual.com/v2/city?city=${userCity}&state=${userState}&country=USA&key=${process.env.REACT_APP_API_KEY}`
				)
				.then((response) => {
					let weatherObj = {
						locationCity: response.data.data.city,
						locationState: response.data.data.state,
						aqius: response.data.data.current.pollution.aqius,
						temperature: response.data.data.current.weather.tp,
						humidity: response.data.data.current.weather.hu,
					};
					setFetchStatus("success");
					localStorage.setItem(
						"Weather-Obj",
						JSON.stringify(weatherObj)
					);

					setUserWeather({
						locationCity: response.data.data.city,
						locationState: response.data.data.state,
						aqius: weatherObj.aqius,
						temperature: weatherObj.temperature,
						humidity: weatherObj.humidity,
					});
				})
				.catch((error) => {
					setFetchStatus(error.response.request.status);
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

	function checkFetchStatus() {
		if (fetchStatus === "success") {
			return "";
		} else {
			return "Please try again.";
		}
	}

	return (
		<VStack>
			<Flex alignSelf="flex-end" p="3">
				<IconButton
					isRound={true}
					size="lg"
					alignSelf="flex-end"
					icon={<FaSun />}
					onClick={toggleColorMode}
				></IconButton>
			</Flex>

			<Container maxW="container.xl" centerContent p="10">
				<Text fontSize="6xl" fontWeight="700">
					Check Local Air Quality
				</Text>
			</Container>
			<Container>
				<form action="submit">
					<Stack spacing={3}>
						<FormControl isRequired>
							<InputGroup>
								<InputLeftElement children={<EditIcon />} />
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
								<InputLeftElement children={<EditIcon />} />
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
						<Text as="i" textAlign={"center"} color="red.500">
							{checkFetchStatus()}
						</Text>
					</Stack>
				</form>

				<VStack spacing="4">
					<Stack p="4">
						{!userWeather.aqius ? null : airQualityImage()}
					</Stack>
					<Text fontSize="4xl">{userWeather.locationCity}</Text>
					{!userWeather.aqius ? (
						<div></div>
					) : (
						<VStack spacing="4">
							<div>Air Quality: {userWeather.aqius}</div>
							<div>
								Temperature: {userWeather.temperature}c&deg;
							</div>
							<div>Humidity: {userWeather.humidity}%</div>
						</VStack>
					)}

					<div></div>
				</VStack>
			</Container>
		</VStack>
	);
};

export default Weather;
