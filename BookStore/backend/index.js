import express from "express";
import mongoose from "mongoose";
import { PORT, mongoURL } from "./config.js";
import { Book } from "./models/bookModel.js";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome TO the the bopok store");
});

app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all the required feilds: title, author, publishYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    res.status(201).send(book);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});
app.get("/books/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const book = await Book.findById(id);
    return res.status(200).send(book);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all the required feilds: title, author, publishYear",
      });
    }

    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(400).send({
        message: "Book Not Found",
      });
    }
    return res.status(200).send("Book Updated SuccesFully");
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id, req.body);

    if (!result) {
      return res.status(400).send({
        message: "Book Not Found",
      });
    }
    return res.status(200).send("Book Deleted SuccesFully");
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
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
