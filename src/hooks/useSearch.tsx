import { useState, useRef, useEffect } from "react";

export function useSearch() {
    const [query, setQuery] = useState('');
    const [error, setError] = useState<string | null>(null);
    const isFirstInput = useRef(true)
  
    useEffect(() => {
      if (isFirstInput.current) {
        isFirstInput.current = query === ''
        return
      }
      if (query === '') {
        setError(`Can't search for empty words`)
      }
      if (query.length < 3) {
        setError(`The search must have at least 3 letters`)
      }
      setError(null)
    }, [query])
  
    return { query, error, setQuery}
  }