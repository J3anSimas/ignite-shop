import Image from 'next/image'
import ProductCard from '../components/pages/home/product-card'
import { useKeenSlider } from 'keen-slider/react'
import { stripe } from '../lib/stripe'
import Stripe from 'stripe'
import { GetStaticProps } from 'next'
import Head from 'next/head'

type THomeProps = {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number
    priceId: string
  }[]
}

export default function Home({ products }: THomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })
  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <main
        className="flex w-full min-h-[656px] max-w-[calc(100vw-((100vw_-_1180px)/2))] overflow-hidden ml-auto keen-slider"
        ref={sliderRef}
      >
        {products.map((product) => (
          <span key={product.id} className="keen-slider__slide ">
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
              priceId={product.priceId}
              imageUrl={product.imageUrl}
            />
          </span>
        ))}
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount ? price.unit_amount / 100 : 0,
      priceId: price.id
    }
  })
  return {
    props: {
      products
    },
    revalidate: 300
  }
}
