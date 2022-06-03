import Prismic from '@prismicio/client';

function getPrismicClient(req?: unknown) {
  const prismic = Prismic.client(process.env.PRISMIC_ENTRY_POINT as string, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN as string,
    req,
  });

  return prismic;
}

export { getPrismicClient };
