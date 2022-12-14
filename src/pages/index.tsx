import Image from 'next/image'
import camiseta1 from '../assets/shirts/1.png'
import camiseta2 from '../assets/shirts/1.png'
import camiseta3 from '../assets/shirts/1.png'
import ProductCard from '../components/pages/home/product-card'
import { useKeenSlider } from 'keen-slider/react'
export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })
  return (
    <main
      className="flex w-full min-height-[656px] max-w-[calc(100vw-((100vw_-_1180px)/2))] overflow-hidden ml-auto keen-slider"
      ref={sliderRef}
    >
      <span className="keen-slider__slide ">
        <ProductCard imageSource={camiseta1} />
      </span>
      <span className="keen-slider__slide">
        <ProductCard imageSource={camiseta1} />
      </span>
      <span className="keen-slider__slide">
        <ProductCard imageSource={camiseta1} />
      </span>
      <span className="keen-slider__slide">
        <ProductCard imageSource={camiseta1} />
      </span>
      <span className="keen-slider__slide">
        <ProductCard imageSource={camiseta1} />
      </span>
    </main>
  )
}
