import { ItemType, ShopItem } from '../../../hooks/useFetch.ts'
import React from 'react'
import getVBuckIcon from '../../../utils/vBuckIcon.tsx'
import Button from '../../Button/Button.tsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import './ItemModal.css'
import IncludedItems from '../../IncludedItems/IncludedItems.tsx';

interface ItemModalProps {
  isOpen: boolean
  item: ShopItem
  onClose: () => void
  isFavorite: (item: ShopItem) => boolean
  toggleFavorite: (item: ShopItem) => void
  additionalData: React.JSX.Element
  includedItems: string[]
}

export default function ItemModal({ isOpen, item, onClose, isFavorite, toggleFavorite, additionalData, includedItems }: ItemModalProps) {
  if (!isOpen) return null

  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-content item-bg" onClick={(e) => e.stopPropagation()}>
        <span className="close-icon" onClick={onClose}>&#10006;</span>
        <h2>{item.name}</h2>
        <p>{getVBuckIcon()} {item.price} V-Bucks</p>
        <p>Available until {item.offerEnd}</p>
        {additionalData}
        <img src={item.image} alt={item.name} />
        <Button variant={"secondary"} onClick={() => toggleFavorite(item)}
                icon={isFavorite(item) ? <FontAwesomeIcon icon={faStarSolid} /> : <FontAwesomeIcon icon={faStar} />}
                value={isFavorite(item) ? "Remove from favorites" : "Add to favorites"}/>
        {(includedItems.length > 1 || item.itemType === ItemType.BUNDLE) && <IncludedItems items={includedItems} />}
      </div>
    </div>
  )
}