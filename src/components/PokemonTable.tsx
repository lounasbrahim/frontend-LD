import { memo } from 'react'
import {
  Box,
  Card,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Pagination,
  MenuItem
} from '@mui/material'

import { usePokemonTable, useMinMaxPower } from '../hooks'
import { PokemonWithPower } from '../types'

interface PokemonTableProps {
  data: PokemonWithPower[]
  setMinPower: (value: number) => void
  setMaxPower: (value: number) => void
}

const PokemonTable: React.FC<PokemonTableProps> = ({
  data,
  setMinPower,
  setMaxPower
}) => {
  const {
    currentPage,
    pageSize,
    pageCount,
    handlePageChange,
    handlePageSizeChange,
    displayedData
  } = usePokemonTable(data, setMinPower, setMaxPower)

  return (
    <>
      <TableContainer
        elevation={4}
        component={Card}
        style={{ marginTop: '40px', borderRadius: '.5rem' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>HP</TableCell>
              <TableCell>Attack</TableCell>
              <TableCell>Defense</TableCell>
              <TableCell>Special Attack</TableCell>
              <TableCell>Special Defense</TableCell>
              <TableCell>Speed</TableCell>
              <TableCell>Power</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData.map((pokemon: PokemonWithPower) => (
              <TableRow key={pokemon.id}>
                <TableCell>{pokemon.id}</TableCell>
                <TableCell>{pokemon.name}</TableCell>
                <TableCell>{pokemon.type.join(', ')}</TableCell>
                <TableCell>{pokemon.hp}</TableCell>
                <TableCell>{pokemon.attack}</TableCell>
                <TableCell>{pokemon.defense}</TableCell>
                <TableCell>{pokemon.special_attack}</TableCell>
                <TableCell>{pokemon.special_defense}</TableCell>
                <TableCell>{pokemon.speed}</TableCell>
                <TableCell>{pokemon.power}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          gap: '10px',
          marginTop: '20px'
        }}
      >
        <p>Rows per page : </p>
        <TextField
          id="select-page-size"
          select
          defaultValue="10"
          variant="standard"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          {[10, 20, 50].map(size => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </TextField>
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </>
  )
}

export const MemoizedPokemonTable = memo(PokemonTable)
