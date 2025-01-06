import './IncludedItem.css'

interface IncludedItemProps {
  name: string
  image: string
}

export default function IncludedItem({ name, image }: IncludedItemProps) {
  return (
    <div className="item">
      <img src={image} alt={name} />
      <div className="name-wrapper">
        <p>{name}</p>
      </div>
    </div>
  )
}