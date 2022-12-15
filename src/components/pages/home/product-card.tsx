import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

import { priceFormatter } from '../../../utils/formatter'
type TProductCardProps = {
  id: string
  name: string
  imageUrl: string
  price: number
}

export default function ProductCard({
  id,
  name,
  imageUrl,
  price
}: TProductCardProps): JSX.Element {
  return (
    <Link
      className="bg-gradient-to-b from-[#1ea483] to-[#7465d4] h-full rounded-lg p-1 relative flex flex-col items-center justify-center overflow-hidden group w-full"
      href={`/products/${id}`}
    >
      <Image
        className="object-cover"
        src={imageUrl}
        alt={name}
        width={520}
        height={480}
      />
      <footer className="absolute bottom-1 left-1 right-1 rounded-md p-4 flex items-center justify-between bg-gray-800 bg-opacity-90 translate-y-[110%] opacity-0 transition-all group-hover:opacity-100 group-hover:translate-y-0">
        <strong className="text-lg text-gray-100">{name}</strong>
        <span className="text-xl font-bold text-green-300">
          {priceFormatter.format(price)}
        </span>
      </footer>
    </Link>
  )
}
