import express from "express";
import { Blog } from "../models/blogModels.js";
const blogRoutes = express.Router();

blogRoutes.get("/", (req, res) => {
  res.send("Blog Home");
});


blogRoutes.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.content) {
      return res.status(400).send({
        message: "Send all the required feilds: title, content"
      });
    }
    const newBlog = {
      title: req.body.title,
      content: req.body.content
    };

    const blog = await Blog.create(newBlog);
    res.status(201).send(blog);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});


blogRoutes.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.content) {
      return res.status(400).send({
        message: "Send all the required feilds: title, content"
      });
    }

    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(400).send({
        message: "Blog Not Found",
      });
    }
    return res.status(200).send("Blog Updated SuccesFully");
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

export { blogRoutes };
