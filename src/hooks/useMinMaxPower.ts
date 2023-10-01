import { useCallback, useState } from 'react'

interface MinMaxPower {
  minPower: number
  maxPower: number
  setMinPower: (value: number) => void
  setMaxPower: (value: number) => void
}

export const useMinMaxPower = (): MinMaxPower => {
  const [minPokemonPower, setMinPokemonPower] = useState(0)
  const [maxPokemonPower, setMaxPokemonPower] = useState(0)

  const setMinPower = useCallback((value: number) => {
    setMinPokemonPower(value)
  }, [])

  const setMaxPower = useCallback((value: number) => {
    setMaxPokemonPower(value)
  }, [])

  return {
    minPower: minPokemonPower,
    maxPower: maxPokemonPower,
    setMinPower,
    setMaxPower
  }
}
