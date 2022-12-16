import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import { X } from 'phosphor-react'
import { useContext } from 'react'
import { CartContext } from '../contexts/cart'
import { priceFormatter } from '../utils/formatter'
export default function CartModal(): JSX.Element {
  const { products, removeProduct } = useContext(CartContext)
  const totalValue = products.reduce((acc, product) => {
    return acc + product.price
  }, 0)

  function handleRemoveProduct(priceId: string): void {
    removeProduct(priceId)
  }
  return (
    <Dialog.Portal>
      <Dialog.Content className="flex flex-col p-12 pt-20 absolute top-0 right-0 w-[30rem] h-screen bg-gray-800">
        <span className="flex justify-end">
          <Dialog.Close>
            <X
              size={24}
              weight="bold"
              className="text-gray-500 absolute top-6 right-6"
            />
          </Dialog.Close>
        </span>
        <Dialog.Title className="text-lg text-gray-100 font-bold">
          Sacola de compras
        </Dialog.Title>
        <ul className="mt-8 flex flex-col gap-6">
          {products.map((product) => (
            <li key={product.priceId} className="flex gap-5">
              <div className="w-[6.37rem] h-[5.8125rem] bg-gradient-to-b from-[#1EA483] to-[#7465D4] rounded-lg">
                <Image
                  src={product.imageUrl}
                  width={95}
                  height={95}
                  alt={product.name}
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-gray-300 text-md mb-1">{product.name}</h3>
                <span className="text-gray-100 text-md font-bold">
                  {priceFormatter.format(product.price)}
                </span>
                <button
                  className="text-green-500 font-bold mt-2 text-[1rem] flex justify-start"
                  onClick={() => handleRemoveProduct(product.priceId)}
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-auto grid">
          <div className="flex justify-between mb-2">
            <span className="text-gray-100">Quantidade</span>
            <span className="text-gray-300 text-md">
              {products.length} itens
            </span>
          </div>
          <div className="flex justify-between font-bold text-gray-100">
            <span className="text-md">Valor total</span>
            <span className="text-xl">{priceFormatter.format(totalValue)}</span>
          </div>
          <button className="bg-green-500 py-6 text-white text-md font-bold rounded-lg mt-14">
            Finalizar compra
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
