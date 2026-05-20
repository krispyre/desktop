import { useState, useEffect } from "react";
import "./weather.css";
/* I read the forecast to see weather in the next few hours, so future information would be emphasized
 */

const Weather = () => {
  const TODAY = new Date();
  const PLACE = "Wong Tai Sin";

  const [nineDayForecast, setNineDayForecast] = useState(null);
  const [curForecast, setCurForecast] = useState(null);

  const [curTemp, setCurTemp] = useState(68);
  const [minTemp, setMinTemp] = useState(67);
  const [maxTemp, setMaxTemp] = useState(69);

  useEffect(() => {
    /* for max min temp */
    fetch("http://localhost:4106/weather/getMaxMinTemp")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        console.warn(data);
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
        setCurForecast(data);
        setCurTemp(data.temperature.data.find((d) => d.place == PLACE).value);
      })
      .catch((e) => console.error("Failed to fetch forecast:", e));

    if (curForecast) {
      console.log(curForecast);
    }
  }, []);

  return (
    <div className="weather">
      <div id="topBar">
        <div id="info">Whole day sunny</div>
        <div id="temps">
          <div id="curTemp">{curTemp}</div>
          <div id="tempRange">
            <div>{minTemp}</div>
            <div>{maxTemp}</div>
          </div>
        </div>
      </div>

      <div id="weathers"></div>
      <div id="warnings"></div>
    </div>
  );
};

export default Weather;
