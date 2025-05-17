import express from "express";
import mongoose from "mongoose";
import { PORT, mongoURL } from "./config.js";

const app = express();

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome TO the the bopok store");
});

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("App Connected to data base");
    app.listen(PORT, () => {
      console.log(`App is listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
