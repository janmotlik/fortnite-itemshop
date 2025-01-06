import { useState, useEffect } from 'react'
import { ShopItem } from './useFetch.ts'

export default function useFavorites() {
  const [favorites, setFavorites] = useState<ShopItem[]>(() => {
    return JSON.parse(localStorage.getItem('favorites') as string) as ShopItem[] || []
  })

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites])

  function toggleFavorite(item: ShopItem) {
    if (!isFavorite(item)) {
      setFavorites([...favorites, item]);
      return;
    }

    setFavorites(favorites.filter(favorite => favorite.id !== item.id))
  }

  function isFavorite(item: ShopItem) {
    return favorites.some(favorite => favorite.id === item.id)
  }

  return { toggleFavorite, isFavorite, favorites }
}