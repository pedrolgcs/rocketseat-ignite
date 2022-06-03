import { Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react';

type Icons = 'cocktail' | 'surf' | 'building' | 'museum' | 'earth';

interface CaracteristicaProps {
  icon: Icons;
  text: string;
}

function Type({ icon, text }: CaracteristicaProps) {
  const isMobile = useBreakpointValue({
    base: false,
    sm: true,
  });

  return (
    <Flex direction={['row', 'column']} align="center" justify="center">
      {isMobile ? (
        <Image
          src={`/images/travel_types/${icon}.svg`}
          alt={icon}
          w="85px"
          h="85px"
          mb="6"
        />
      ) : (
        <Text color="yellow.400" fontSize="4xl" mr="2">
          •
        </Text>
      )}
      <Text fontWeight="600" color="gray.700" fontSize={['md', 'xl', '2xl']}>
        {text}
      </Text>
    </Flex>
  );
}

export { Type };
