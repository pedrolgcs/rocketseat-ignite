import { ImageResponse } from 'next/og'
import colors from 'tailwindcss/colors'
import { getProduct } from '@/data/request/product'
import { env } from '@/env'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'About Acme'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

type ImageProps = {
  params: {
    slug: string
  }
}

export default async function OgImage({ params }: ImageProps) {
  const product = await getProduct(params.slug)

  const productImageUrl = new URL(
    product.image,
    env.NEXT_PUBLIC_APP_URL,
  ).toString()

  return new ImageResponse(
    (
      <div
        style={{
          background: colors.zinc['950'],
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <img src={productImageUrl} alt="" style={{ width: '100%' }} />
      </div>
    ),
    {
      ...size,
    },
  )
}
