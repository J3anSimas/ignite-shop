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
  organizeCartToCheckout: () => TOrganizedCartItem[]
}
export type TOrganizedCartItem = {
  price: string
  quantity: number
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

  function organizeCartToCheckout(): TOrganizedCartItem[] {
    const newList: TOrganizedCartItem[] = []
    products.forEach((item) => {
      const index = newList.findIndex(
        (newListItem) => newListItem.price === item.priceId
      )
      console.log(index)
      index >= 0
        ? (newList[index].quantity += 1)
        : newList.push({ price: item.priceId, quantity: 1 })
    })
    return newList
  }

  return (
    <CartContext.Provider
      value={{ products, addProduct, removeProduct, organizeCartToCheckout }}
    >
      {children}
    </CartContext.Provider>
  )
}
