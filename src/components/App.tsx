import { useMemo } from 'react'
import { ThemeProvider, createTheme } from '@mui/material'

import { themeOptions } from '../config'
import { useFetch } from '../hooks'
import { PokemonApp } from './PokemonApp'
import { Pokemon, PokemonWithPower } from '../types'

const theme = createTheme(themeOptions)

export const App = () => {
  const { data, loading, error } = useFetch<Pokemon[]>('/pokemon.json')

  const pokemonData: PokemonWithPower[] = useMemo(() => {
    return (data || [])?.map((pokemon: Pokemon) => {
      const { hp, attack, defense, special_attack, special_defense, speed } =
        pokemon
      const power =
        hp + attack + defense + special_attack + special_defense + speed
      return {
        ...pokemon,
        power
      }
    })
  }, [data])

  if (loading) return <h1>Loading...</h1>

  if (error) {
    return <h1>an errror occured</h1>
  }

  if (!data || data.length === 0) {
    return null
  }

  return (
    <ThemeProvider theme={theme}>
      <PokemonApp data={pokemonData} />
    </ThemeProvider>
  )
}
