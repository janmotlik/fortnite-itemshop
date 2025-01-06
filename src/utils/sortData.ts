import { ShopItem } from '../hooks/useFetch.ts'

export default function sortData(data: ShopItem[]) {
  return Array.from(data).sort((a, b) => {
    const colorA = `${a.bgColor1}-${a.bgColor2}`
    const colorB = `${b.bgColor1}-${b.bgColor2}`

    if (colorA < colorB) return -1
    if (colorA > colorB) return 1

    if (a.price !== b.price) return b.price - a.price
    return a.rawData.sortPriority - b.rawData.sortPriority
  })
}