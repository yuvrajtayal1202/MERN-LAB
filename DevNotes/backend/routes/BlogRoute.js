import express from 'express'

const blogRoutes = express.Router()

blogRoutes.get('/', (req, res) => {
    res.send('Blog Home');
});

export { blogRoutes }