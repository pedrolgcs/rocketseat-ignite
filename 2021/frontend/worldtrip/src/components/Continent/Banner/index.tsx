import { Flex, Heading } from '@chakra-ui/react';

type Continent = {
  name: string;
  img_url: string;
};

type BannerProps = {
  continent: Continent;
};

function Banner({ continent }: BannerProps) {
  return (
    <Flex
      w="100%"
      h={['163px', '250px', '350px', '500px']}
      bgImage={`url('${continent.img_url}')`}
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPosition="center"
    >
      <Flex
        w="100%"
        maxW="1140px"
        mx="auto"
        alignItems="flex-end"
        px={['4', '8']}
        py={['6', '6', '6', '16']}
      >
        <Heading color="gray.100" fontSize={['2xl', '3xl', '5xl']}>
          {continent.name}
        </Heading>
      </Flex>
    </Flex>
  );
}

export { Banner };
