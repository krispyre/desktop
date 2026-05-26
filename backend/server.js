/* Had to use my own server bc front end can't read csv bc of cors restrictions lol */
import express from "express";
import cors from "cors";
import { parse as parseCsv } from "csv-parse/sync";

import { pool as db } from "./db.js";
import axios from "axios";

const app = express();

const STATION_POS = 4 + 1; //"HK Observatory"; // use the HKO one, placeholder, se cookie todo?

app.use(
  /.*/,
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());
app.get("/weather/getMaxMinTemp", async (req, res) => {
  let max = 69,
    min = 67;
  const apiRes = await axios.get(
    "https://data.weather.gov.hk/weatherAPI/hko_data/regional-weather/latest_since_midnight_maxmin.csv",
    {
      responseType: "text",
    },
  ); // returns csv

  const tempRanges = apiRes.data;
  const temps = parseCsv(tempRanges)[STATION_POS];
  console.log("get temp range:", tempRanges, temps);
  max = temps[2];
  min = temps[3];

  res.status(201).send({ max, min });
});

app.get("/weather/getWarnings", async (req, res) => {
  const warnings = await axios.get(
    "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warnsum&lang=en",
  );
  res.status(200).send(Object.keys(warnings.data));
  return;
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

const USER_ID = 2;
const LIST_ID = 0;

app.get("/todolist/getListItems", async (req, res) => {
  console.log("get list");
  const result = await db.query(
    `select * from todoitems where user_id = ${USER_ID} and list_id = ${LIST_ID} ;`,
  );
  res.send(result.rows);
});

app.post("/todolist/addListItem", async (req, res) => {
  const new_desc = req.body.description;
  const result = await db.query(
    `insert into todoitems (user_id, is_done, description, list_id) values (${USER_ID}, false, '${new_desc}', ${LIST_ID}) returning todo_id;`,
  );
  console.log(result);
  res.status(201).send({ id: result.rows[0].todo_id });
});

app.listen(4106, () => {
  console.log("Listening on 4106");
});
