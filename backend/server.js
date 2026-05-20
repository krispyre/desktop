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
  console.log(tempRanges);
  const temps = parse(tempRanges)[STATION_POS];
  console.log(temps);
  max = temps[2];
  min = temps[3];

  console.log("max is 2990 min is 3 yo");
  res.status(201).send({ max, min });
});

console.log("Listening on 4106");
app.listen(4106);
