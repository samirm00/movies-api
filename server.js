import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import dotenv from 'dotenv';

import moviesRoutes from './routes/movies.js';

// configure dotenv
dotenv.config();
const PORT = process.env.PORT || 3005;

// construct path
const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

// initial express
const app = express();

// set template engine
app.set('view engine', 'ejs');
app.set('views', path.join(PATH, 'views'));

// parse body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static folder
app.use(express.static(path.join(PATH, 'public')));

// use routes
app.use('/api/movies', moviesRoutes);

// handle 404
app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Page not Found!',
        message: `this page doesn't exist`
    });
});

// listen
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});
