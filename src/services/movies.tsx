import { MovieApi, Movie } from '../types';

const API_KEY = '456af1d3';
const MOVIES_API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=`;

export const searchMovies = async ({ search } : { search: string }) => {
    if (!search) return [];
    try {
        const response = await fetch(`${MOVIES_API_URL}${search}`);
        const data = await response.json();
        const movies: MovieApi[] = data.Search;
        const mappedMoviesProcess: Movie[] = movies?.map((movie) => ({
            id: movie.imdbID,
            year: movie.Year,
            title: movie.Title,
            poster: movie.Poster,
            type: movie.Type
        }));

        return mappedMoviesProcess;
    } catch (_) {
        throw new Error('Error searching the movies')
    }
}