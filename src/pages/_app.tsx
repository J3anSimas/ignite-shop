import type { AppProps } from 'next/app'
import '../styles/global.css'
import Image from 'next/image'
import Link from 'next/link'
import { CartProvider } from '../contexts/cart'
import Header from '../components/header'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <div className="flex bg-red-500 flex-col items-start min-h-screen justify-center">
        <Header />
        <Component {...pageProps} />
      </div>
    </CartProvider>
  )
}
