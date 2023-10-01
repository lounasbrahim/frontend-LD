import React, { useCallback, memo } from 'react'
import { Container } from '@mui/material'

import { PokemonWithPower } from '../types'
import { useMinMaxPower, usePokemonTable, useSearch } from '../hooks'
import { SearchPokemon } from './SearchPokemon'
import { MemoizedPokemonTable } from './PokemonTable'

interface PokemonAppProps {
  data: PokemonWithPower[]
}

export const PokemonApp: React.FC<PokemonAppProps> = ({ data }) => {
  const { filteredData, setSearchName, setSearchThreshold } = useSearch(data)
  const { minPower, maxPower, setMinPower, setMaxPower } = useMinMaxPower()

  const handleSearch = useCallback(
    (searchName: string, searchThreshold: string) => {
      setSearchName(searchName)
      setSearchThreshold(searchThreshold)
    },
    [setSearchName, setSearchThreshold]
  )

  return (
    <Container maxWidth="xl">
      <SearchPokemon
        onSearch={handleSearch}
        minPower={minPower}
        maxPower={maxPower}
      />
      <MemoizedPokemonTable
        data={filteredData}
        setMinPower={setMinPower}
        setMaxPower={setMaxPower}
      />
    </Container>
  )
}
