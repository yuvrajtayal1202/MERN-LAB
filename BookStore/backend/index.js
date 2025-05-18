import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import { PORT, mongoURL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";
const app = express();

app.use(express.json());

// CORS middleware must come BEFORE routes!
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use("/books", booksRoute);

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Welcome TO the book store");
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