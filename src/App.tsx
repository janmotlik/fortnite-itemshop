import Navigation from './components/Navigation/Navigation.tsx'
import Footer from './components/Footer/Footer.tsx'
import ShopData from './components/ ShopData/ShopData.tsx'
import useFilters from './hooks/useFilters.ts'
import useFavorites from './hooks/useFavorites.ts'

export default function App() {
  const { filters, updateFilter, resetFilters } = useFilters()
  const { toggleFavorite, isFavorite } = useFavorites()

  return (
      <>
        <Navigation filters={filters} updateFilters={updateFilter} resetFilters={resetFilters} />
        <ShopData filters={filters} isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
        <Footer />
      </>
  )
}