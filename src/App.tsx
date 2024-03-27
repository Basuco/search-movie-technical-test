import { useCallback, useState } from 'react'
// import { useRef } from 'react';
import './App.css';
import Movies from './components/Movies';
import { useSearch } from './hooks/useSearch';
import debounce from 'just-debounce-it';

function App() {
  // const inputRef = useRef<HTMLInputElement>(null)
  const [sort, setSort] = useState(false)
  const [search, setSearch] = useState('')
  const { error, query, setQuery } = useSearch()
  const handlSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // const value = inputRef?.current?.value
    const fields = new FormData(event.currentTarget)
    // const query = fields.get('query') as string
    const { query } = Object.fromEntries(fields) as Record<string, string>
    setSearch(query)
  }

  const debouncedSetSearch = useCallback(debounce((search : string) => {
    setSearch(search)
  }, 500), [])

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setQuery(newValue)
    debouncedSetSearch(newValue)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <>
      <div className='page'>
        <header>
          <h1>Movie searcher</h1>
          <form className='form' onSubmit={handlSubmit}>
            <input value={query} onChange={handleChange} name='query' placeholder='Avengers, Starwars, Matrix...'></input>
            <input type='checkbox' onClick={handleSort} name='sort'/>
            <button type='submit'>Search</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </header>


        <main>
          <Movies search={search} sort={sort}/>
        </main>
      </div>
    </>
  )
}

export default App
