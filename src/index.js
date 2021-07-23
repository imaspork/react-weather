import React from "react";
import ReactDOM from "react-dom";
import Weather from "./App";
import { ChakraProvider, theme, ColorModeScript } from "@chakra-ui/react";

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<Weather />
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// } else if (userWeather.aqius >= 101 && userWeather.aqius <= 150) {
//	setImageState(<SvgBad fill="#ffb14c" />);
//} else if (userWeather.aqius >= 151 && userWeather.aqius <= 200) {
//	setImageState(<SvgVeryBad fill="#ff6275" />);
//} else if (userWeather.aqius >= 201 && userWeather.aqius <= 300) {
//	setImageState(<SvgTerrible fill="#b36ebe" />);
//} else {
//	setImageState(<SvgThreatening fill="#955476" />);
//}
