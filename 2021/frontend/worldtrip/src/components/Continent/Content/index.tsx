import { Flex, Grid, Text } from '@chakra-ui/react';

// components
import { Infos } from './Infos';

type Continent = {
  name: string;
  description: string;
};

type ContentProps = {
  continent: Continent;
};

function Content({ continent }: ContentProps) {
  return (
    <Flex direction="column" maxW="1140px" mx="auto" mb="10" px={['6', '8']}>
      <Grid
        templateColumns={['1fr', '1fr', '1fr 1fr', '1.2fr 1fr']}
        gap={[5, 10, 16, 20]}
        my={['8', '20']}
      >
        <Text
          fontSize={['lg', 'xl', 'xl', '2xl']}
          color="gray.600"
          textAlign="justify"
        >
          A Europa é, por convenção, um dos seis continentes do mundo.
          Compreendendo a península ocidental da Eurásia, a Europa geralmente
          divide-se da Ásia a leste pela divisória de águas dos montes Urais, o
          rio Ural, o mar Cáspio, o Cáucaso, e o mar Negro a sudeste
        </Text>

        <Infos />
      </Grid>
    </Flex>
  );
}

export { Content };
