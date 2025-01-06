import './Navigation.css'
import Button from '../Button/Button.tsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import FilterModal from '../Modal/FilterModal/FilterModal.tsx'

interface NavigationProps {
  filters: any
  updateFilters: () => void
  resetFilters: () => void
}

export default function Navigation({ filters, updateFilters, resetFilters }: NavigationProps) {
  const [isModalOpen, setModalOpen] = useState<boolean>(false)

  return (
      <>
        <nav>
          <img src="/assets/icon.png" alt="site logo"/>
          <h1>Fortnite Shop</h1>
          <Button variant={"primary"} onClick={() => setModalOpen(!isModalOpen)} icon={<FontAwesomeIcon icon={faFilter}/>} value={"Filter"}/>
          <input type="text" placeholder="Search by name" onKeyUp={(e) => updateFilters('query', e.target.value)}/>
        </nav>

        <FilterModal isOpen={isModalOpen} onClose={() => setModalOpen(!isModalOpen)} filters={filters} updateFilters={updateFilters} resetFilters={resetFilters} />
      </>
    )
}