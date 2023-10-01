import React, { useState, useCallback } from 'react'
import { Box, Card, TextField } from '@mui/material'

interface SearchPokemonProps {
  onSearch: (searchName: string, searchThreshold: string) => void
  minPower: number
  maxPower: number
}

export const SearchPokemon: React.FC<SearchPokemonProps> = ({
  onSearch,
  minPower,
  maxPower
}) => {
  const [searchName, setSearchName] = useState('')
  const [searchThreshold, setSearchThreshold] = useState('')

  const handleSearch = useCallback(
    (searchName: string, searchThreshold: string) => {
      onSearch(searchName, searchThreshold)
    },
    [onSearch]
  )

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, searchThreshold: string) => {
      setSearchName(e.target.value)
      handleSearch(e.target.value, searchThreshold)
    },
    [handleSearch, searchThreshold]
  )

  const handleThresholdChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, searchName: string) => {
      setSearchThreshold(e.target.value)
      handleSearch(searchName, e.target.value)
    },
    [handleSearch, searchName]
  )

  return (
    <Card
      variant="elevation"
      elevation={4}
      sx={{ marginTop: '2.5rem', padding: '1rem', borderRadius: '.5rem' }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ width: '50%' }}>
          <TextField
            label="Search by Pokémon Name"
            sx={{ width: '100%' }}
            value={searchName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleNameChange(e, searchThreshold)
            }
            style={{ marginRight: '10px' }}
          />
        </Box>
        <Box sx={{ width: '50%' }}>
          <TextField
            sx={{ width: '100%' }}
            label="Power Threshold"
            value={searchThreshold}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleThresholdChange(e, searchName)
            }
            style={{ marginRight: '10px' }}
          />
        </Box>
      </Box>
      <Box sx={{ marginTop: '40px' }}>Min power : {minPower} </Box>
      <Box sx={{ marginTop: '10px' }}>Min power : {maxPower}</Box>
    </Card>
  )
}
