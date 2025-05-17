import express from "express";
import mongoose from "mongoose";
import { PORT, mongoURL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";
const app = express();

app.use(express.json());

app.use("/books", booksRoute);

app.use(cors());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

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
