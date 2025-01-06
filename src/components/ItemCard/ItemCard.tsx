import { ItemType, ShopItem } from '../../hooks/useFetch.ts';
import getVBuckIcon from '../../utils/vBuckIcon.tsx';
import { useState } from 'react';
import ItemModal from '../Modal/ItemModal/ItemModal.tsx';
import './ItemCard.css'

interface ItemCardProps {
  item: ShopItem
  isFavorite: (item: ShopItem) => boolean
  toggleFavorite: (item: ShopItem) => void
}

export default function ItemCard({ item, isFavorite, toggleFavorite }: ItemCardProps) {
  const [isModalOpen, setModalOpen] = useState<boolean>(false)

  const className = (): string => {
    if (item.itemType === ItemType.BUNDLE) return "itemcard bundle"
    if (item.itemType === ItemType.TRACK) return "itemcard track"
    return "itemcard"
  }

  const includedItems: string[] = [item.rawData.brItems, item.rawData.cars,
    item.rawData.legoKits, item.rawData.instruments, item.rawData.tracks].filter(Boolean).flat();

  function getAdditionalData() {
    if (item.itemType === ItemType.NORMAL) return (
      <>
        <p>Type: {item.type}</p>
        <p>Rarity: {item.rarity}</p>
        <p>Description: {item.description}</p>
      </>
    )

    if (item.itemType === ItemType.TRACK) return (
      <>
        <p>Artist: {item.artist}</p>
        <p>Album: {item.album}</p>
        <p>Released: {item.released}</p>
      </>
    )

    return <></>
  }

  return (
    <>
      <div className={className()}
           style={{background: `linear-gradient(#${item.bgColor1.substring(0, 6)}, #${item.bgColor2.substring(0, 6)})`}}
           onClick={() => setModalOpen(!isModalOpen)}>
        <img loading="lazy" src={item.image} alt={item.name}></img>
        <h3>{item.name}</h3>
        <p>{getVBuckIcon()} {item.price} V-Bucks</p>
      </div>

      <ItemModal isOpen={isModalOpen} item={item} onClose={() => setModalOpen(!isModalOpen)} isFavorite={isFavorite} toggleFavorite={toggleFavorite} additionalData={getAdditionalData()} includedItems={includedItems} />
    </>
  );
}