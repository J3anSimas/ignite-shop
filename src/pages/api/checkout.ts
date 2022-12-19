import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../lib/stripe'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { listItems } = request.body

  if (request.method !== 'POST')
    return response.status(405).json({ error: 'Method not allowed' })
  if (!listItems)
    return response
      .status(400)
      .json({ error: 'Could not parse cart information' })

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url:
      process.env.NEXT_URL + '/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: process.env.NEXT_URL + '',

    mode: 'payment',
    line_items: listItems
  })
  return response.status(201).json({ checkoutUrl: checkoutSession.url })
}
