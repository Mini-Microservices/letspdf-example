import { useState } from "react"

type UseFetchHook = [
  any,
  boolean,
  (opts?: RequestInit) => Promise<void>
]

const useFetch = (url: string): UseFetchHook => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  const performFetch = async (opts?: RequestInit): Promise<void> => {
    setLoading(true)
    setData(undefined)
    const res = await fetch(url, opts || {})
    const json = await res.json()

    setData(json)
    setLoading(false)
  }

  return [data, loading, performFetch]
}

export default useFetch
