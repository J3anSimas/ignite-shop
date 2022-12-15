import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'

type TSuccessProps = {
  customerName: string
  product: {
    name: string
    imageUrl: string
  }
}
export default function Success({
  customerName,
  product
}: TSuccessProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop </title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="h-[590px] flex flex-col items-center justify-center mx-auto">
        <h1 className="text-2xl text-gray-100 font-bold leading-snug mb-16">
          Compra efetuada!
        </h1>
        <div className="flex justify-center items-center w-32 h-36 bg-gradient-to-b from-[#1EA483] to-[#7465D4] rounded-lg mb-8">
          <Image src={product.imageUrl} width={114} height={106} alt="" />
        </div>
        <p className="text-gray-300 text-xl leading-snug mb-20 max-w-xl text-center">
          Uhuul <strong className="capitalize">{customerName}</strong>, sua{' '}
          <strong>{product.name}</strong> já está a caminho da sua casa.{' '}
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
  const product = lineItems.data[0].price?.product as Stripe.Product

  return {
    props: {
      customerName: customerDetails
        ? String(customerDetails.name).toLowerCase()
        : 'Customer',
      product: {
        name: product.name,
        imageUrl: product.images[0]
      }
    }
  }
}
