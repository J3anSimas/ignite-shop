import type { AppProps } from 'next/app'
import '../styles/global.css'
import logoImg from '../assets/logo.svg'
import Image from 'next/image'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex bg-red-500 flex-col items-start min-h-screen justify-center">
      <header className="py-8 w-full max-w-[1180px] my-0 mx-auto">
        <Image src={logoImg} alt="" />
      </header>
      <Component {...pageProps} />
    </div>
  )
}
