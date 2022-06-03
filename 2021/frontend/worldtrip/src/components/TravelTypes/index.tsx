import { Grid, GridItem } from '@chakra-ui/layout';

// components
import { Type } from './Type';

function TravelTypes() {
  return (
    <Grid
      templateColumns={['1fr 1fr', '1fr 1fr', '1fr 1fr', 'repeat(5, 1fr)']}
      w="100%"
      justify="space-between"
      align="center"
      mt={['8', '24']}
      mx="auto"
      maxW="1140px"
      gap={['1', '12']}
    >
      <GridItem>
        <Type icon="cocktail" text="vida noturna" />
      </GridItem>
      <GridItem>
        <Type icon="surf" text="praia" />
      </GridItem>
      <GridItem>
        <Type icon="building" text="moderno" />
      </GridItem>
      <GridItem>
        <Type icon="museum" text="clássico" />
      </GridItem>
      <GridItem colSpan={[2, 2, 2, 1]}>
        <Type icon="earth" text="e mais..." />
      </GridItem>
    </Grid>
  );
}

export { TravelTypes };
