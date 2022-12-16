import { createContext, ReactNode, useState } from 'react'

type TProduct = {
  name: string
  price: number
  priceId: string
  imageUrl: string
}

type TCartContext = {
  products: TProduct[]

  addProduct: (product: TProduct) => void
  removeProduct: (priceId: string) => void
}
export const CartContext = createContext<TCartContext>({} as TCartContext)

export function CartProvider({
  children
}: {
  children: ReactNode
}): JSX.Element {
  const [products, setProducts] = useState<TProduct[]>([])

  function addProduct(product: TProduct): void {
    setProducts((state) => {
      return [...state, product]
    })
  }
  function removeProduct(priceId: string): void {
    const newList = products.filter((product) => product.priceId !== priceId)
    setProducts(newList)
  }

  return (
    <CartContext.Provider value={{ products, addProduct, removeProduct }}>
      {children}
    </CartContext.Provider>
  )
}
