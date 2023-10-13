import express from 'express';

import moviesControllers from '../controllers/movies.js';

const router = express.Router();

router.get('/', moviesControllers.getMovies);
router.get('/:id', moviesControllers.getMovie);
router.post('/', moviesControllers.addMovie);
router.put('/:id', moviesControllers.updateMovie);
router.delete('/:id', moviesControllers.deleteMovie);

export default router;
