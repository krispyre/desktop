import { useState, useEffect } from "react";
import axios from "axios";

import "./weather.css";
import WarningIcon from "./weatherParts/warningIcon";
import WeatherIcon from "./weatherParts/WeatherIcon";
/* I read the forecast to see weather in the next few hours, so future information would be emphasized
 */

const Weather = () => {
  const TODAY = new Date();
  const PLACE = "Sha Tin";

  // const [nineDayForecast, setNineDayForecast] = useState(null);
  const [curForecast, setCurForecast] = useState(null);

  const [curTemp, setCurTemp] = useState(68);
  const [minTemp, setMinTemp] = useState(67);
  const [maxTemp, setMaxTemp] = useState(69);

  const [weatherIcons, setWeatherIcons] = useState<number[]>([]);

  const [warnings, setWarnings] = useState<string[]>([]);

  const [tempUnit, setTempUnit] = useState("°C");

  useEffect(() => {
    // An AbortController allows us to cancel all 3 network requests if the component unmounts
    const controller = new AbortController();

    const getTempRanges = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4106/weather/getMaxMinTemp",
          {
            signal: controller.signal,
          },
        );
        setMaxTemp(parseFloat(response.data.max));
        setMinTemp(parseFloat(response.data.min));
      } catch (e) {
        if (!axios.isCancel(e)) {
          console.error("Failed to fetch climate and weather info:", e);
        }
      }
    };

    const getCurForecast = async () => {
      try {
        const response = await axios.get(
          "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en",
          { signal: controller.signal },
        );

        const data = response.data;
        setWeatherIcons(data.icon);
        setCurForecast(data);

        const placeData = data.temperature.data.find((d) => d.place === PLACE);
        if (placeData) {
          setCurTemp(placeData.value);
        }
      } catch (e) {
        if (!axios.isCancel(e)) {
          console.error("Failed to fetch forecast:", e);
        }
      }
    };

    const getWarnings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4106/weather/getWarnings",
          {
            signal: controller.signal,
          },
        );
        setWarnings(response.data);
      } catch (e) {
        if (!axios.isCancel(e)) {
          console.error("Failed to fetch warnings:", e);
        }
      }
    };

    getTempRanges();
    getCurForecast();
    getWarnings();

    // cleanup function for uef oh wow
    return () => {
      controller.abort();
    };
  }, []); // Runs once on mount

  return (
    <div className="widget weather">
      <div id="topBar">
        <div id="info">Whole day sunny</div>
        <div id="temps">
          <div id="curTemp">
            {curTemp}
            <span className="tempUnit">{tempUnit}</span>
          </div>
          <div id="tempRange">
            <div>
              {minTemp}
              <span className="tempUnit">{tempUnit}</span>
            </div>
            <div>
              {maxTemp}
              <span className="tempUnit">{tempUnit}</span>
            </div>
          </div>
        </div>
      </div>

      <div id="weathers">
        <div id="weatherIcons">
          {weatherIcons.map((i) => (
            <WeatherIcon code={i} />
          ))}
        </div>
        <sub id="time">{TODAY.getHours() + ":" + TODAY.getMinutes()}</sub>
      </div>
      <div id="warnings">
        {warnings.map((w) => (
          <WarningIcon code={w} />
        ))}
      </div>
    </div>
  );
};

export default Weather;
