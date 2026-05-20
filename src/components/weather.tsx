import React from "react";

/* I read the forecast to see weather in the next few hours, so future information would be emphasized
 */

const Weather = () => {
  const forecast = fetch(
    "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en",
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((e) => console.error(e));

  console.log(forecast);
  return (
    <div className="weather">
      <div id="topBar">
        <div>Whole day sunny/ Rain soon</div>
        <div>
          <div>current temp</div>
          <div>
            <div>lowest temp</div>
            <div>highest temp</div>
          </div>
        </div>
      </div>

      <div id="weathers"></div>
      <div id="warnings"></div>
    </div>
  );
};

export default Weather;
