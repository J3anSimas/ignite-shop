import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import Link from 'next/link'
import { Handbag } from 'phosphor-react'
import { useContext } from 'react'
import { CartContext } from '../contexts/cart'
import CartModal from './cart-modal'

export default function Header({ center }: { center?: boolean }): JSX.Element {
  const { products } = useContext(CartContext)
  return (
    <header
      className={`py-8 w-full max-w-[1180px] my-0 mx-auto flex ${
        center ? 'justify-center' : 'justify-between'
      } items-center`}
    >
      <Link href="/">
        <Image src="/logo.svg" alt="" width={130} height={52} />
      </Link>
      {!center && (
        <Dialog.Root>
          <Dialog.Trigger className="relative" asChild>
            <button className="bg-gray-800 p-3 rounded-md relative">
              {products.length > 0 && (
                <span className="bg-green-500 h-6 w-6 text-sm text-white flex justify-center items-center absolute top-[-7px] right-[-7px] rounded-full">
                  {products.length}
                </span>
              )}
              <Handbag className="text-gray-500" weight="bold" size={24} />
            </button>
          </Dialog.Trigger>
          <CartModal />
        </Dialog.Root>
      )}
    </header>
  )
}
