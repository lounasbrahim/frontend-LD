import { useState, useEffect, useCallback, useMemo } from 'react'
import { PokemonWithPower } from '../types'

export const usePokemonTable = (
  data: PokemonWithPower[],
  setMinPower: (value: number) => void,
  setMaxPower: (value: number) => void
) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  const pageCount = useMemo(
    () => Math.ceil(data.length / pageSize),
    [data, pageSize]
  )

  const handlePageChange = useCallback((e, newPage: number) => {
    setCurrentPage(newPage)
  }, [])

  const handlePageSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSize = parseInt(e.target.value)
      setPageSize(newSize)
      setCurrentPage(1)
    },
    []
  )

  const startIndex = useMemo(
    () => (currentPage - 1) * pageSize,
    [currentPage, pageSize]
  )
  const endIndex = useMemo(() => startIndex + pageSize, [startIndex, pageSize])

  const displayedData = useMemo(() => {
    return data.filter((p, index) => {
      return index >= startIndex && index < endIndex
    })
  }, [data, startIndex, endIndex])

  useEffect(() => {
    if (displayedData.length > 0) {
      const powers = displayedData.map(el => el.power)
      setMinPower(Math.min(...powers))
      setMaxPower(Math.max(...powers))
    } else {
      setMinPower(0)
      setMaxPower(0)
    }
  }, [displayedData, setMinPower, setMaxPower])

  return {
    currentPage,
    pageSize,
    pageCount,
    handlePageChange,
    handlePageSizeChange,
    displayedData
  }
}
