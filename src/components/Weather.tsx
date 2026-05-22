import { useState, useEffect } from "react";
import "./weather.css";
import WarningIcon from "./weatherParts/warningIcon";
import WeatherIcon from "./weatherParts/WeatherIcon";
/* I read the forecast to see weather in the next few hours, so future information would be emphasized
 */

const Weather = () => {
  const TODAY = new Date();
  const PLACE = "Sha Tin";

  const [nineDayForecast, setNineDayForecast] = useState(null);
  const [curForecast, setCurForecast] = useState(null);

  const [curTemp, setCurTemp] = useState(68);
  const [minTemp, setMinTemp] = useState(67);
  const [maxTemp, setMaxTemp] = useState(69);

  const [weatherIcons, setWeatherIcons] = useState<number[]>([]);

  const [warnings, setWarnings] = useState<string[]>([]);

  const [tempUnit, setTempUnit] = useState("°C");

  useEffect(() => {
    /* for max min temp */
    fetch("http://localhost:4106/weather/getMaxMinTemp")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        setMaxTemp(parseFloat(data.max));
        setMinTemp(parseFloat(data.min));
      })
      .catch((e) =>
        console.error("Failed to fetch climate and weather info:", e),
      );

    fetch(
      "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en",
    )
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        setWeatherIcons(data.icon);
        setCurForecast(data);
        setCurTemp(data.temperature.data.find((d) => d.place == PLACE).value);
      })
      .catch((e) => console.error("Failed to fetch forecast:", e));

    if (curForecast) {
      console.log(curForecast);
    }

    fetch("http://localhost:4106/weather/getWarnings")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        setWarnings(data);
      })
      .catch((e) => console.error("Failed to fetch warnings:", e));
  }, []);

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
