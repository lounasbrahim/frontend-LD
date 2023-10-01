import { useState, useEffect, useMemo } from 'react'

interface FetchResult<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

export function useFetch<T>(url: string): FetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true)
    const controller = new AbortController()

    fetch(url, { signal: controller.signal })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`)
        }
        return response.json()
      })
      .then((responseData: T) => {
        setData(responseData)
      })
      .catch((err: Error) => {
        if (err.name !== 'AbortError') {
          console.error('Fetch error:', err)
          setError(err)
        }
      })
      .finally(() => {
        setLoading(false)
      })

    return () => controller.abort()
  }, [url])

  const memoizedResult: FetchResult<T> = useMemo(() => {
    return { data, loading, error }
  }, [data, loading, error])

  return memoizedResult
}
