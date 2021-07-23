import React, { useState } from "react";
import {
	Input,
	Stack,
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
	Box,
	Grid,
	GridItem,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
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
					console.log(response);
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
		if (fetchStatus === "failure") {
			return;
		} else if (userWeather.aqius <= 50) {
			return <SvgExcellent fill="#a2ef61" />;
		} else if (userWeather.aqius >= 51 && userWeather.aqius <= 100) {
			return <SvgGood fill="#ffec50" />;
		} else if (userWeather.aqius >= 101 && userWeather.aqius <= 150) {
			return <SvgBad fill="#ffb14c" />;
		} else if (userWeather.aqius >= 151 && userWeather.aqius <= 200) {
			return <SvgVeryBad fill="#ff6275" />;
		} else if (userWeather.aqius >= 201 && userWeather.aqius <= 300) {
			return <SvgTerrible fill="#b36ebe" />;
		} else {
			return <SvgThreatening fill="#955476" />;
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

	function apiFetchToggle() {
		apiFetch();
	}

	function checkStatusChangeRender() {
		if (!userWeather.aqius) {
			return null;
		} else if (fetchStatus === "false") {
			return null;
		} else {
			return airQualityImage();
		}
	}

	return (
		<VStack>
			<Flex alignSelf="flex-end" p="3">
				<IconButton
					isRound={true}
					size="lg"
					icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
					boxShadow="inner"
					onClick={toggleColorMode}
				></IconButton>
			</Flex>

			<Container maxW="container.xl" centerContent p="10">
				<Text fontSize="6xl" fontWeight="700">
					Check Local Air Quality
				</Text>
			</Container>
			<Container maxW="container.md">
				<Container maxW="container.sm">
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
							<Button
								variant="solid"
								boxShadow="md"
								onClick={apiFetchToggle}
							>
								Check Quality
							</Button>
						</Stack>
					</form>
				</Container>

				<Box
					textAlign="center"
					maxW="container.md"
					boxShadow="2xl"
					id="weather-box"
					p="15px"
					color="white"
					mt="4"
					rounded="md"
				>
					<Text as="i" textAlign={"center"} color="red.500">
						{checkFetchStatus()}
					</Text>
					<Accordion color={"gray.500"} allowToggle>
						<AccordionItem>
							<h2>
								<AccordionButton>
									<Box flex="1" textAlign="center">
										Air Quality Chart
									</Box>
									<AccordionIcon />
								</AccordionButton>
							</h2>
							<AccordionPanel>
								<Grid
									textAlign={"center"}
									h="200px"
									templateRows="repeat(6, 1fr)"
									templateColumns="repeat(7, 1fr)"
									gap={1}
									rounded={"md"}
								>
									<GridItem
										rounded={"md"}
										rowStart={1}
										colSpan={8}
										colStart={1}
										bg="blue.500"
									>
										<Text fontSize={"x-large"}>
											Air Quality Index Chart
										</Text>
									</GridItem>

									<GridItem
										rounded={"md"}
										colSpan={5}
										colStart={3}
										rowStart={2}
										bg="#a2ef61"
									>
										<Text>Good</Text>
									</GridItem>

									<GridItem
										rounded={"md"}
										colSpan={2}
										colStart={1}
										rowStart={2}
										bg="#a2ef61"
									>
										<Text>0-51 AQI</Text>
									</GridItem>
									<GridItem
										rounded={"md"}
										colSpan={5}
										colStart={3}
										rowStart={3}
										bg="#ffec50"
									>
										<Text>Moderate</Text>
									</GridItem>
									<GridItem
										rounded={"md"}
										colSpan={2}
										colStart={1}
										rowStart={3}
										bg="#ffec50"
									>
										<Text>51-100 AQI</Text>
									</GridItem>
									<GridItem
										rounded={"md"}
										colSpan={5}
										colStart={3}
										rowStart={4}
										bg="#ffb14c"
									>
										<Text>
											Unhealthy for Sensitive Groups
										</Text>
									</GridItem>
									<GridItem
										rounded={"md"}
										colSpan={2}
										colStart={1}
										rowStart={4}
										bg="#ffb14c"
									>
										<Text>101-150 AQI</Text>
									</GridItem>
									<GridItem
										rounded={"md"}
										colSpan={5}
										colStart={3}
										rowStart={5}
										bg="#ff6275"
									>
										<Text>Unhealthy</Text>
									</GridItem>
									<GridItem
										rounded={"md"}
										colSpan={2}
										colStart={1}
										rowStart={5}
										bg="#ff6275"
									>
										<Text>151-200 AQI</Text>
									</GridItem>
									<GridItem
										rounded={"md"}
										colSpan={5}
										colStart={3}
										rowStart={6}
										bg="#b36ebe"
									>
										<Text>Very Unhealthy</Text>
									</GridItem>
									<GridItem
										rounded={"md"}
										colSpan={2}
										colStart={1}
										rowStart={6}
										bg="#b36ebe"
									>
										<Text>201-300 AQI</Text>
									</GridItem>
									<GridItem
										rounded={"md"}
										colSpan={5}
										colStart={3}
										rowStart={7}
										bg="#955476"
									>
										<Text>Hazardous</Text>
									</GridItem>
									<GridItem
										rounded={"md"}
										colSpan={2}
										colStart={1}
										rowStart={7}
										bg="#955476"
									>
										<Text>301-500 AQI</Text>
									</GridItem>
								</Grid>
							</AccordionPanel>
						</AccordionItem>
					</Accordion>
					<Flex spacing="4" p="4" alignItems justifyContent>
						<Container maxWidth="25%" p="4" centerContent>
							{checkStatusChangeRender()}
						</Container>
						<Container maxWidth="75%">
							<Grid
								textAlign="center"
								color="black"
								h="75px"
								templateRows="repeat(4, 1fr)"
								templateColumns="repeat(2, 1fr)"
								gap={7}
							>
								<GridItem colSpan={1} colStart={1} rowStart={4}>
									<Text fontSize="x-large">
										{!userWeather.temperature
											? ""
											: `Temperature: ${userWeather.temperature}Cº`}
									</Text>
								</GridItem>
								<GridItem colSpan={1} colStart={1}>
									<Text fontSize="x-large">
										{!userWeather.aqius
											? ""
											: `AQI: ${userWeather.aqius}`}
									</Text>
								</GridItem>
								<GridItem colSpan={1} colStart={2}>
									<Text fontSize="x-large">
										{!userWeather.locationCity
											? ""
											: `${userWeather.locationCity}`}
									</Text>
								</GridItem>
								<GridItem rowStart={4} colSpan={1} colStart={2}>
									<Text fontSize="x-large">
										{!userWeather.humidity
											? ""
											: `Humidity: ${userWeather.humidity}`}
									</Text>
								</GridItem>
							</Grid>
						</Container>
					</Flex>
				</Box>
			</Container>
		</VStack>
	);
};

export default Weather;
