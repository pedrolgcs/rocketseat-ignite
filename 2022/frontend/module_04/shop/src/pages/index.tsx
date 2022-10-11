import * as React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Slider } from '@/components';
import { Product } from '@/entities';
import { getProducts, GetProductsResponse } from '@/requests/products';
import * as S from '@/styles/pages/home.styles';

type HomeProps = {
  products: GetProductsResponse[];
};

export default function Home({ products }: HomeProps) {
  const normalizedProducts = products.map(
    (product) =>
      new Product({
        ...product,
      })
  );

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <S.HomeContainer>
        <Slider>
          {normalizedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              prefetch={false}
            >
              <S.Product>
                <Image
                  src={product.imagesUrl[0] as string}
                  alt={product.name}
                  width={520}
                  height={480}
                  priority
                />

                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.formattedPrice}</span>
                </footer>
              </S.Product>
            </Link>
          ))}
        </Slider>
      </S.HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts();

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
