import { Grid, Heading, Flex } from '@chakra-ui/react';

// components
import { Item } from './Item';

function Cities() {
  return (
    <Flex
      direction="column"
      w="100%"
      maxW="1140px"
      mx="auto"
      mb="10"
      px={['4', '6']}
    >
      <Heading fontWeight="medium" fontSize={['32', "36"]} color="gray.600">Cidades +100</Heading>
      <Grid
        templateColumns={['1fr', '1fr', '1fr 1fr', 'repeat(4, 1fr)']}
        gap="12"
        my="12"
      >
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </Grid>
    </Flex>
  );
}

export { Cities };
