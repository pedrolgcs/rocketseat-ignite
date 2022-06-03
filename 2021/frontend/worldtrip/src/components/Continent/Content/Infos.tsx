import { Flex, Heading, Text, Tooltip, Icon } from '@chakra-ui/react';

import { RiInformationLine } from 'react-icons/ri';

function Infos() {
  return (
    <Flex align="center" justify="space-between">
      <Flex
        direction="column"
        justify="center"
        align={['flex-start', 'flex-start', 'center']}
      >
        <Heading fontSize={['2xl', '5xl']} color="yellow.400" fontWeight="500">
          30
        </Heading>
        <Text fontWeight="500" fontSize={['md', 'xl']} color="gray.700">
          países
        </Text>
      </Flex>

      <Flex
        direction="column"
        justify="center"
        align={['flex-start', 'flex-start', 'center']}
      >
        <Heading fontSize={['2xl', '5xl']} color="yellow.400" fontWeight="500">
          40
        </Heading>
        <Text fontWeight="500" fontSize={['md', 'xl']} color="gray.700">
          línguas
        </Text>
      </Flex>

      <Flex
        direction="column"
        justify="center"
        align={['flex-start', 'flex-start', 'center']}
      >
        <Heading fontSize={['2xl', '5xl']} color="yellow.400" fontWeight="500">
          240
        </Heading>
        <Flex align="center">
          <Text fontWeight="500" fontSize={['md', 'xl']} color="gray.700">
            cidades +100
          </Text>
          <Tooltip label="Informação sobre o continente">
            <span>
              <Icon
                cursor="pointer"
                as={RiInformationLine}
                ml="1"
                color="gray.400"
                w={['10px', '16px']}
                h={['10px', '16px']}
              />
            </span>
          </Tooltip>
        </Flex>
      </Flex>
    </Flex>
  );
}

export { Infos };
