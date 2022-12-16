import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { Handbag } from 'phosphor-react'
import { useContext } from 'react'
import { CartContext } from '../../../contexts/cart'
import { priceFormatter } from '../../../utils/formatter'
type TProductCardProps = {
  id: string
  name: string
  imageUrl: string
  price: number
  priceId: string
}

export default function ProductCard({
  id,
  name,
  imageUrl,
  price,
  priceId
}: TProductCardProps): JSX.Element {
  const { addProduct } = useContext(CartContext)
  function handleAddItemToCart(): void {
    addProduct({ name, price, priceId, imageUrl })
  }
  return (
    <span className="group ">
      <Link
        className="bg-gradient-to-b from-[#1ea483] to-[#7465d4] h-full rounded-lg p-1 relative flex flex-col items-center justify-center overflow-hidden w-full"
        href={`/products/${id}`}
        prefetch={false}
      >
        <Image
          className="object-cover"
          src={imageUrl}
          alt={name}
          width={520}
          height={480}
        />
      </Link>
      <footer className="absolute bottom-1 left-1 right-1 rounded-md p-4 flex items-center justify-between bg-gray-800 bg-opacity-90 translate-y-[110%] opacity-0 transition-all group-hover:opacity-100 group-hover:translate-y-0">
        <span className="flex flex-col">
          <strong className="text-lg text-gray-100">{name}</strong>
          <span className="text-xl font-bold text-green-300">
            {priceFormatter.format(price)}
          </span>
        </span>
        <button
          className="bg-green-500 p-3 rounded-md"
          onClick={handleAddItemToCart}
        >
          <Handbag size={32} weight="bold" className="text-white" />
        </button>
      </footer>
    </span>
  )
}
