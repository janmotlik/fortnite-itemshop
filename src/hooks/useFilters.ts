import { useState } from 'react'

export default function useFilters() {
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 5000,
    types: [],
    query: "",
    onlyFavorites: false
  })

  function updateFilter(key: any, value: any) {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  function resetFilters() {
    setFilters({
      minPrice: 0,
      maxPrice: 5000,
      types: [],
      query: filters.query,
      onlyFavorites: false
    })
  }

  return { filters, updateFilter, resetFilters }
}