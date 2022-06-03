import { Flex, SimpleGrid, Box, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// components
import { Header } from '../components/Header';
import { SideBar } from '../components/SideBar';

// configs
import apexOptions from '../config/apex';

// fake data for analytic graphics
const series = [
  {
    name: 'series1',
    data: [791, 202, 178, 528, 890, 100, 300],
  },
];

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my={["2", "6"]} maxW="1480px" mx="auto" px="6">
        <SideBar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="center">
          <Box p={['6', '8']} bg="gray.800" borderRadius="8" pb="4">
            <Text fontSize="lg" mb="4">
              Inscritos da semana
            </Text>
            <Chart
              options={apexOptions}
              series={series}
              type="area"
              height={160}
            />
          </Box>

          <Box p={['6', '8']} bg="gray.800" borderRadius="8" pb="4">
            <Text fontSize="lg" mb="4">
              Taxa de abertura
            </Text>
            <Chart
              options={apexOptions}
              series={series}
              type="area"
              height={160}
            />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
