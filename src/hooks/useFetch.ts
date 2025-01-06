import { useEffect, useState } from 'react'
import { getImage, getItemType, getName } from '../utils/apiHelper.ts'
import formatDate from '../utils/formatDate.ts'

export default function useFetch(url: string) {
  const [data, setData] = useState<ShopItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>()

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url)
        const json = await response.json()

        const parsedData: ShopItem[] = json.data.entries.map((entry: any) => ({
          name: getName(entry),
          id: entry.offerId,
          image: getImage(entry),
          price: entry.finalPrice,
          offerEnd: formatDate(entry.outDate),
          itemType: getItemType(entry),
          bgColor1: entry.colors?.color1 ? entry.colors.color1 : "085c89",
          bgColor2: entry.colors?.color3 ? entry.colors.color3 : "085c89",
          type: getItemType(entry) === ItemType.NORMAL ? (entry.brItems?.[0].type.displayValue ?? entry.instruments?.[0].type.displayValue) : "N/A",
          description: getItemType(entry) === ItemType.NORMAL ? (entry.brItems?.[0].description ?? entry.instruments?.[0].description) : "N/A",
          rarity: getItemType(entry) === ItemType.NORMAL ? (entry.brItems?.[0].rarity.displayValue ?? entry.instruments?.[0].rarity.displayValue) : "N/A",
          artist: getItemType(entry) === ItemType.TRACK ? entry.tracks?.[0].artist : "N/A",
          album: getItemType(entry) === ItemType.TRACK ? entry.tracks?.[0].album ?? "N/A" : "N/A",
          released: getItemType(entry) === ItemType.TRACK ? entry.tracks?.[0].releaseYear : 0,
          rawData: entry
        }))

        setData(parsedData)
      } catch (error: any) {
        setError(true)
        console.error(`Couldn't fetch data from FortniteAPI - ${error}`)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export enum ItemType {
  BUNDLE = 'Bundles',
  NORMAL = 'Items & Emotes',
  INSTRUMENT = 'Instruments',
  TRACK = 'Tracks'
}

export interface ShopItem {
  id: string
  name: string
  price: number
  offerEnd: string
  itemType: ItemType
  image: string
  bgColor1: string
  bgColor2: string
  type: string
  rarity: string
  description: string
  artist: string
  album: string
  released: number
  rawData: any
}