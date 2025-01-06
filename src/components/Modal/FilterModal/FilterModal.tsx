import './FilterModal.css'
import getVBuckIcon from '../../../utils/vBuckIcon.tsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faRotateRight, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import Button from '../../Button/Button.tsx'
import { faStar } from '@fortawesome/free-regular-svg-icons'

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  filters: any
  updateFilters: any
  resetFilters: any
}

export default function FilterModal({ isOpen, onClose, filters, updateFilters, resetFilters}: FilterModalProps) {
  if (!isOpen) return null;

  function handleChange(type: any) {
    updateFilters(
      "types",
      filters.types.includes(type)
        ? filters.types.filter((t: any) => t !== type)
        : [...filters.types, type]
    );
  }

  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-content filter-bg" onClick={(e) => e.stopPropagation()}>
        <span className="close-icon" onClick={onClose}>&#10006;</span>

        <div className="price-filter">
          <h3>{getVBuckIcon()} Filter by price</h3>
          <div className="min-price">
            <p>Minimum price</p>
            <input min="0" max="5000" type="number" placeholder="Min. price"
              value={filters.minPrice} onChange={(e) => updateFilters("minPrice", e.target.value)}/>
          </div>

          <div className="max-price">
            <p>Maximum price</p>
            <input min="0" max="5000" type="number" placeholder="Max. price"
                   value={filters.maxPrice} onChange={(e) => updateFilters("maxPrice", e.target.value)}/>
          </div>
        </div>

        <div className="type-filter">
          <h3><FontAwesomeIcon icon={faList} size="xs"/> Filter by type</h3>
          <div className="checkboxes">
            {["Outfit", "Wrap", "Emote", "Pickaxe", "Glider", "Shoes"].map((type: string) => {
              return (
                <label key={type}>
                  <input type="checkbox" checked={filters.types.includes(type)}
                         onChange={() => handleChange(type)}/>
                  <span className="checkmark"></span>
                  <p>{type}</p>
                </label>
              )
            })}
          </div>
        </div>

        <div className="filter-buttons">
          <Button variant="primary" onClick={resetFilters} icon={<FontAwesomeIcon icon={faRotateRight} />} value="Reset Filters" />
          <Button variant="primary"
                  onClick={() => {updateFilters("onlyFavorites", !filters.onlyFavorites)}}
                  icon={filters.onlyFavorites ? <FontAwesomeIcon icon={faStarSolid} /> : <FontAwesomeIcon icon={faStar} />}
                  value={filters.onlyFavorites ? "Hide Favorites" : "Show Favorites"}/>
        </div>
      </div>
    </div>
  )
}