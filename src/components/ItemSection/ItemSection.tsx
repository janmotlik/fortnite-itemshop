import ItemCard from '../ItemCard/ItemCard.tsx'
import { ShopItem } from '../../hooks/useFetch.ts';
import './ItemSection.css'

interface ItemSectionProps {
  sectionName: string
  items: ShopItem[]
  isFavorite: (item: ShopItem) => boolean
  toggleFavorite: (item: ShopItem) => void
}

export default function ItemSection({ sectionName, items, isFavorite, toggleFavorite }: ItemSectionProps) {
  return (
    <section>
      <h2>{sectionName}</h2>
      <div className="itemcard-wrapper">
        {items.map(item => {
          return <ItemCard
            key={item.id}
            item={item}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
          />
        })}
      </div>
    </section>
  )
}