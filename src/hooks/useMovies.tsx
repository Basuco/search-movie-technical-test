import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Movie } from '../types';
import { searchMovies } from '../services/movies';

export function useMovies({ search, sort = false } : { search: string, sort: boolean}) {
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previousSearch = useRef(search);

    const getMovies = useCallback(async (search : string) => {
        if (search === previousSearch.current) return
        try {
            previousSearch.current = search
            setLoading(true)
            const newMovies = await searchMovies({search})
            setMovies(newMovies)
        } catch(e: any) {
            setError(e.message || 'Error getting the movies')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        getMovies(search)
    },[search])

    const sortedMovies = useMemo(() => {
        return sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies
    }, [movies, sort])

    return {
        movies : sortedMovies,
        loading,
        error,
        getMovies
    }
}