import useFetch, { ItemType, ShopItem } from '../../hooks/useFetch.ts'
import ItemSection from '../ItemSection/ItemSection.tsx'
import sortData from '../../utils/sortData.ts'

interface ShopDataProps {
  filters: any
  isFavorite: (item: ShopItem) => boolean
  toggleFavorite: (item: ShopItem) => void
}

export default function ShopData({ filters, isFavorite, toggleFavorite }: ShopDataProps) {
  const { data, loading, error } = useFetch('https://fortnite-api.com/v2/shop')

  if (loading) {
    return <h2>Loading Data..</h2>
  }

  if (error) {
    return <h2>Couldn't fetch data</h2>
  }

  function filterItems(items: ShopItem[]) {
    const queryFiltered = items.filter(item =>
      item.name.toLowerCase().startsWith(filters.query.toLowerCase())
    );

    return queryFiltered.filter(item => {
      const matchesPrice = (!filters.minPrice || item.price >= filters.minPrice)
        && (!filters.maxPrice || item.price <= filters.maxPrice);
      const matchesType =
        filters.types.length === 0 || filters.types.includes(item.rawData.brItems?.[0].type.displayValue ?? item.rawData.instruments?.[0].type.displayValue);

      return matchesPrice && matchesType;
    })
  }

  return (
    <main>
      {!loading &&
        Object.keys(ItemType).map((type) => {

          let filteredItems = filterItems(data.filter((item: any) => item.itemType === ItemType[type as keyof typeof ItemType]));
          filteredItems = sortData(filteredItems);

          if (filters.onlyFavorites) {
            filteredItems = filteredItems.filter(item => isFavorite(item));
          }
          if (filteredItems.length === 0) return null;

          return (
            <ItemSection
              key={type}
              sectionName={ItemType[type as keyof typeof ItemType]}
              items={filteredItems}
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
            />
          )
        })}
    </main>
  );

}