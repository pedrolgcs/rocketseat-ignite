import { Flex, Image, Heading, Text } from '@chakra-ui/react';

function Item() {
  return (
    <Flex
      direction="column"
      borderWidth="thin"
      borderColor="yellow.300"
      bg="white"
    >
      <Image
        w={['100%', '100%', '100%', '256px']}
        src="/images/continents/africa.jpg"
        alt="africa"
      />
      <Flex p="4" justify="space-between" align="center">
        <Flex direction="column">
          <Heading my={['2', '4']} as="h3" fontSize="20px">
            Londres
          </Heading>
          <Text fontSize="16px" color="gray.400">
            Reino Unido
          </Text>
        </Flex>

        <Image
          w="30px"
          h="30px"
          borderRadius="50%"
          src="/images/continents/africa.jpg"
          alt="cite"
        />
      </Flex>
    </Flex>
  );
}

export { Item };
