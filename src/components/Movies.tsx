import { useMovies } from "../hooks/useMovies";

export default function Movies({ search = '', sort = false}) {
    const { movies, loading } = useMovies({ search, sort });
    const hasMovies = movies && movies.length > 0;
    const renderMovies = () => {
        return (<ul className="movies">
            {
              movies.map(movie => (
                <li className="movie" key={movie.id}>
                  <h3>{movie.title}</h3>
                  <p>{movie.year}</p>
                  <img src={movie.poster} alt={movie.title}></img>
                </li>
              ))
            }
          </ul>)
    }

    const renderNoResults = () => {
        return (<h2>No results</h2>)
    }

    const renderLoading = () => {
        return (<h2>Loading...</h2>)
    }
    return (
        <>
            {   
                loading 
                ? renderLoading() 
                : hasMovies
                    ? renderMovies()
                    : renderNoResults()
            }
        </>
    )
}