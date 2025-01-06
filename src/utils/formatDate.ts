export default function formatDate(date: string) {
  const [ year, month, day ] = date.substring(0, 10).split("-")
  return `${month}/${day}/${year}`
}