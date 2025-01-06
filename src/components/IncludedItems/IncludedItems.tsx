import IncludedItem from './IncludedItem/IncludedItem.tsx';
import './IncludedItems.css'

export default function IncludedItems({ items }: any) {
  return (
    <div className="included-wrapper">
      <h4>Included Items</h4>
      <div className="included-items">
        {items.map((item: any) => {
          return (
            <IncludedItem key={item.id} name={item.name ?? item.title} image={item.albumArt ?? item.images.icon ?? item.images.small} />
          );
        })}
      </div>
    </div>
  )
}