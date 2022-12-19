import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'
import Header from '../components/header'
import { stripe } from '../lib/stripe'

type TSuccessProps = {
  customerName: string
  images: {
    imageUrl: string
  }[]
}
export default function Success({
  customerName,
  images
}: TSuccessProps): JSX.Element {
  return (
    <>
      <Header center />
      <Head>
        <title>Compra efetuada | Ignite Shop </title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="h-[590px] flex flex-col items-center justify-center mx-auto">
        <div className="flex ">
          {images.map(({ imageUrl }) => (
            <div
              key={imageUrl}
              className="flex justify-center items-center w-32 h-32 ml-[-3.25rem] bg-gradient-to-b from-[#1EA483] to-[#7465D4] rounded-full mb-8 first:ml-0"
            >
              <Image src={imageUrl} width={114} height={106} alt="" />
            </div>
          ))}
        </div>
        <h1 className="text-2xl text-gray-100 font-bold leading-snug mt-12 mb-6">
          Compra efetuada!
        </h1>
        <p className="text-gray-300 text-xl leading-snug mb-16 max-w-xl text-center">
          Uhuul <strong className="capitalize">{customerName}</strong>, sua
          compra de {images.length} camisas já está à caminho da sua casa.{' '}
        </p>
        <Link className="text-lg text-green-500 font-bold " href="/">
          Voltar ao catálogo
        </Link>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<
  any,
  { sesison_id: string }
> = async ({ query }: GetServerSidePropsContext) => {
  if (!query.session_id)
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  const sessionId = String(query.session_id)

  const response = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })
  const customerDetails = response.customer_details
  const lineItems = response.line_items as Stripe.ApiList<Stripe.LineItem>
  const images = lineItems.data.map((item) => {
    const product = item.price?.product as Stripe.Product
    return {
      imageUrl: product.images[0]
    }
  })
  console.log(images)

  return {
    props: {
      customerName: customerDetails
        ? String(customerDetails.name).toLowerCase()
        : 'Customer',
      images: images
    }
  }
}
