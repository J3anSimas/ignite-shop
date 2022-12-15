import axios from 'axios'
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsContext
} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ParsedUrlQuery, StringifyOptions } from 'querystring'
import { useState } from 'react'
import Stripe from 'stripe'
import { stripe } from '../../lib/stripe'
import { priceFormatter } from '../../utils/formatter'

type TProductProps = {
  id: string
  imageUrl: string
  name: string
  price: number
  description: string
  defaultPriceId: string
}
export default function Product({
  id,
  name,
  imageUrl,
  description,
  price,
  defaultPriceId
}: TProductProps): JSX.Element {
  const [isRedirectingToCheckoutPage, setIsRedirectingToCheckoutPage] =
    useState(false)
  const { isFallback } = useRouter()

  async function handleBuyProduct(): Promise<void> {
    setIsRedirectingToCheckoutPage(true)
    try {
      const response = await axios.post('/api/checkout', {
        priceId: defaultPriceId
      })

      window.location.href = response.data.checkoutUrl
    } catch (error) {
      alert('Falha ao redirecionar à página de checkout')
      setIsRedirectingToCheckoutPage(false)
    }
  }
  return (
    <>
      <Head>
        <title>{name} | Ignite Shop</title>
      </Head>
      <main className="grid mx-auto gap-[4.5rem] grid-cols-2 w-full max-w-[1180px] h-[656px]">
        <div className="bg-gradient-to-b from-[#1EA483] to-[#7465D4] rounded-lg flex items-center justify-center">
          {isFallback ? (
            <div className="w-full h-full bg-gray-800 rounded-lg"></div>
          ) : (
            <Image src={imageUrl} alt="" width={540} height={480} />
          )}
        </div>
        <div className="h-full flex flex-col">
          {isFallback ? (
            <span className="h-12 w-full bg-gray-800 rounded-lg mb-3"></span>
          ) : (
            <h1 className="text-gray-300 font-bold text-2xl leading-relaxed mb-3">
              {name}
            </h1>
          )}
          {isFallback ? (
            <span className="h-12 w-full bg-gray-800 rounded-lg"></span>
          ) : (
            <span className="text-green-300 text-2xl leading-relaxed ">
              {priceFormatter.format(price)}
            </span>
          )}
          {isFallback ? (
            <span className="h-12 w-full bg-gray-800 rounded-lg mt-10"></span>
          ) : (
            <p className="text-md text-gray-300 mt-10">{description}</p>
          )}
          <button
            className="text-md text-white w-full py-5 bg-green-500 font-bold flex justify-center rounded-lg mt-auto hover:bg-green-300 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={handleBuyProduct}
            disabled={isRedirectingToCheckoutPage}
          >
            Comprar agora
          </button>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params
}: GetStaticPropsContext) => {
  const query = params as ParsedUrlQuery
  const response = await stripe.products.retrieve(query.id as string, {
    expand: ['default_price']
  })
  const price = response.default_price as Stripe.Price
  return {
    props: {
      id: response.id,
      imageUrl: response.images[0],
      name: response.name,
      price: price.unit_amount ? price.unit_amount / 100 : 0,
      description: response.description,
      defaultPriceId: price.id
    },
    revalidate: 300
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const productsResponse = await stripe.products.list()
  return {
    paths: [],
    fallback: true
  }
}
