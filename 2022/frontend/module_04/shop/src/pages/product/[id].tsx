import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Product } from '@/entities';
import { useMutationCreateCheckout } from '@/hooks/mutation';
import { getProductById, GetProductByIdResponse } from '@/requests/products';
import * as S from '@/styles/pages/product.styles';

type ProductProps = {
  product: GetProductByIdResponse;
};

export default function ProductById({ product }: ProductProps) {
  const normalizedProduct = new Product(product);

  const { mutate: createCheckoutMutate, isLoading: createCheckoutIsLoading } =
    useMutationCreateCheckout();

  async function handleBuyProduct() {
    createCheckoutMutate(
      { priceId: normalizedProduct.defaultPriceId },
      {
        onSuccess(response) {
          window.location.href = response.checkoutUrl;
        },
      }
    );
  }

  return (
    <>
      <Head>
        <title>{normalizedProduct.name} | Ignite Shop</title>
      </Head>

      <S.ProductContainer>
        <S.ImageContainer>
          <Image
            src={normalizedProduct.imagesUrl[0] as string}
            alt={normalizedProduct.name}
            width={520}
            height={480}
            priority
          />
        </S.ImageContainer>

        <S.ProductDetails>
          <h1>{normalizedProduct.name}</h1>
          <span>{normalizedProduct.formattedPrice}</span>
          <p>{normalizedProduct.description}</p>
          <button
            type="button"
            disabled={createCheckoutIsLoading}
            onClick={handleBuyProduct}
          >
            Comprar agora
          </button>
        </S.ProductDetails>
      </S.ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = String(params?.id);

  const product = await getProductById({ id: productId });

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};
