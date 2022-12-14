import Image from 'next/image'
import camiseta1 from '../assets/shirts/1.png'
import camiseta2 from '../assets/shirts/1.png'
import camiseta3 from '../assets/shirts/1.png'
import ProductCard from '../components/pages/home/product-card'
export default function Home() {
  return (
    <main className="flex gap-12 w-full min-height-[656px] max-w-[calc(100vw-((100vw_-_1180px)/2))] ml-auto">
      <ProductCard imageSource={camiseta1} />
      <ProductCard imageSource={camiseta1} />
      <ProductCard imageSource={camiseta1} />
    </main>
  )
}
