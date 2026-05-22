/* Had to use my own server bc front end can't read csv bc of cors restrictions lol */
import express from "express";
import cors from "cors";
import { parse } from "csv-parse/sync";

const app = express();

const STATION_POS = 4 + 1; //"HK Observatory"; // use the HKO one, placeholder, se cookie todo?

app.use(
  /.*/,
  cors({
    origin: "http://localhost:5173",
  }),
);
app.get("/weather/getMaxMinTemp", async (req, res) => {
  let max = 69,
    min = 67;
  const apiRes = await fetch(
    "https://data.weather.gov.hk/weatherAPI/hko_data/regional-weather/latest_since_midnight_maxmin.csv",
  );

  if (!apiRes.ok) throw new Error("Network error");
  const tempRanges = await apiRes.text();
  // console.log(tempRanges);
  const temps = parse(tempRanges)[STATION_POS];
  console.log(temps);
  max = temps[2];
  min = temps[3];

  res.status(201).send({ max, min });
});

app.get("/weather/getWarnings", async (req, res) => {
  const apiRes = await fetch(
    "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warnsum&lang=en",
  );
  if (!apiRes.ok) throw new Error("Network error");
  const warnings = await apiRes.json();
  // res.status(200).send(Object.keys(warnings));

  res
    .status(200)
    .send([
      "WFIREY",
      "WFIRER",
      "WFROST",
      "WHOT",
      "WCOLD",
      "WMSGNL",
      "WRAINA",
      "WRAINR",
      "WRAINB",
      "WFNTSA",
      "WL",
      "WTCSGNL3",
      "WTCSGNL8NW",
      "WTMW",
      "WTS",
    ]);
});

console.log("Listening on 4106");
app.listen(4106);
