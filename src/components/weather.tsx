import { useState, useEffect } from "react";
import "./weather.css";
import WarningIcon from "./weatherParts/warningIcon";
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
        setCurForecast(data);
        setCurTemp(data.temperature.data.find((d) => d.place == PLACE).value);
      })
      .catch((e) => console.error("Failed to fetch forecast:", e));

    if (curForecast) {
      console.log(curForecast);
    }

    fetch(
      "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warnsum&lang=en",
    )
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        setWarnings(Object.keys(data));
        console.log(Object.keys(data));
      })
      .catch((e) => console.error("Failed to fetch forecast:", e));
  }, []);

  return (
    <div className="weather">
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

      <div id="weathers"></div>
      <div id="warnings">
        {warnings.map((w) => (
          <WarningIcon code={w} />
        ))}
      </div>
    </div>
  );
};

export default Weather;

/*WFIRE: Fire Danger Warning
WFROST: Frost Warning
WHOT: Hot Weather Warning
WCOLD: Cold Weather Warning
WMSGNL: Strong Monsoon Signal
WRAIN: Rainstorm Warning Signal
WFNTSA: Special Announcement on Flooding in
the northern New Territories
WL: Landslip Warning
WTCSGNL: Tropical Cyclone Warning Signal
WTMW: Tsunami Warning
WTS: Thunderstorm Warning
*/
