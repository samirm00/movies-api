import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { v4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

let movies = [
    {
        id: '1',
        name: 'Patriot',
        src: 'https://m.media-amazon.com/images/I/518IZVOjisL._AC_UF894,1000_QL80_.jpg'
    },
    {
        id: '2',
        name: 'Barbie',
        src: 'https://m.media-amazon.com/images/I/71BgdzmFDAL.jpg'
    },
    {
        id: '3',
        name: 'Troy',
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQF-3wteC9fSNiCZEekpEByLW4axm4boSGX4JD-mZlgA&s'
    },
    {
        id: '4',
        name: 'Harry Potter',
        src: 'https://cdn.europosters.eu/image/hp/80594.jpg'
    },
    {
        id: '5',
        name: 'Tom & Jerry',
        src: 'https://cdn.europosters.eu/image/750/posters/looney-tunes-tom-and-jerry-i12290.jpg'
    },
    {
        id: '6',
        name: 'little mermaid',
        src: 'https://www.themoviedb.org/t/p/original/cJbKUdbWcIFDuHhs6uvOfacemc4.jpg'
    },
    {
        id: '7',
        name: 'Oppenheimer',
        src: 'https://movies.universalpictures.com/media/06-opp-dm-mobile-banner-1080x745-now-pl-f01-071223-64bab982784c7-1.jpg'
    }
];

const getMovieById = (id) => {
    return movies.find((movie) => movie.id === id);
};

const moviesControllers = {
    getMovies: (req, res) => {
        res.status(200).render('movies', { movies: movies });
    },
    getMovie: (req, res) => {
        const { id } = req.params;
        const movieExist = getMovieById(id);
        if (movieExist) {
            res.status(200).render('movie', { movie: movieExist });
        } else {
            res.status(404).json({
                message: `movie with id ${id} doesn't existed`
            });
        }
    },
    addMovie: (req, res) => {
        const { name, src } = req.body;
        const newMovie = {
            id: v4(),
            name: name,
            src: src
        };

        movies.push(newMovie);
        res.status(201).json(newMovie);
    },
    updateMovie: (req, res) => {
        const { id } = req.params;
        const { name, src } = req.body;

        const movieExist = getMovieById(id);
        if (movieExist) {
            const updatedMovie = { id, name, src };
            movies.forEach((movie, index) => {
                if (movie.id === id) {
                    movies[index] = updatedMovie;
                    res.status(200).json(updatedMovie);
                }
            });
        } else {
            res.status(404).json({
                message: `movie with id ${id} doesn't exist`
            });
        }
    },
    deleteMovie: (req, res) => {
        const { id } = req.params;
        const movieExist = getMovieById(id);
        if (movieExist) {
            movies = movies.filter((movie) => movie.id !== id);
            res.status(200).json({
                message: `movie with id ${id} deleted successful`
            });
        } else {
            res.status(404).json({
                message: `movie with id ${id} doesn't existed`
            });
        }
    }
};

export default moviesControllers;
