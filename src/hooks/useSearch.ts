import { useState, useEffect, useMemo, useCallback } from 'react'

import { PokemonWithPower } from '../types'

export const useSearch = (data: PokemonWithPower[]) => {
  const [filteredPokemonData, setFilteredPokemonData] = useState<
    PokemonWithPower[]
  >([])
  const [searchPokemonName, setSearchPokemonName] = useState('')
  const [searchPokemonThreshold, setSearchPokemonThreshold] = useState('')

  const filteredPokemon = useCallback(
    (name: string, threshold: string) => {
      return data.filter(pokemon => {
        const isNameMatch =
          !name || pokemon.name.toLowerCase().includes(name.toLowerCase())
        const isThresholdMatch =
          !threshold || pokemon.power >= parseInt(threshold)
        return isNameMatch && isThresholdMatch
      })
    },
    [data]
  )

  const debouncedFilterPokemon = useMemo(() => {
    const delay = 300
    let timerId: number

    return (name: string, threshold: string) => {
      clearTimeout(timerId)
      timerId = setTimeout(() => {
        const filtered = filteredPokemon(name, threshold)
        setFilteredPokemonData(filtered)
      }, delay)
    }
  }, [filteredPokemon])

  const filteredData = useMemo(() => {
    return filteredPokemonData
  }, [filteredPokemonData])

  const setSearchName = useCallback(
    (value: string) => {
      setSearchPokemonName(value)
    },
    [setSearchPokemonName]
  )

  const setSearchThreshold = useCallback(
    (value: string) => {
      setSearchPokemonThreshold(value)
    },
    [setSearchPokemonThreshold]
  )

  useEffect(() => {
    if (data && data.length > 0) {
      debouncedFilterPokemon(searchPokemonName, searchPokemonThreshold)
    }
  }, [data, searchPokemonName, searchPokemonThreshold, debouncedFilterPokemon])

  return { filteredData, setSearchName, setSearchThreshold }
}
