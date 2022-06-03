import { Flex, Heading, Image, Text, Box } from '@chakra-ui/react';

function Banner() {
  return (
    <Flex
      w="100%"
      h={['163px', '250px', '250px', '335px']}
      bgImage="url('/images/space.png')"
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <Flex
        justify={['center', 'space-between']}
        align="center"
        w="100%"
        px={['4', '10', '15', '20', '36']}
      >
        <Box>
          <Heading
            color="gray.100"
            fontWeight="500"
            fontSize={['xl', '2xl', '2xl', '2xl', '4xl']}
          >
            5 continentes,
            <br />
            infinitas possibilidades.
          </Heading>
          <Text
            color="gray.300"
            mt="5"
            fontSize={['0.8rem', 'xl']}
            maxW={['100%', '100%', '100%', '550px']}
          >
            Chegou a hora de tirar do papel a viagem que você sempre sonhou.
          </Text>
        </Box>
        <Image
          w={['300px', '300px', '350px', '430px']}
          display={['none', 'none', 'block']}
          src="/images/airplane.svg"
          alt="Avião amarelo voando com algumas nuvens ao redor."
          transform="translateY(48px)"
          ml="20"
        />
      </Flex>
    </Flex>
  );
}

export { Banner };
