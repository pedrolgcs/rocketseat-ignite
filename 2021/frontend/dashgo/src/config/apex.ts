import { theme } from '@chakra-ui/react';
import { ApexOptions } from 'apexcharts';

export default {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      '2021-03-15T00:00:00.000z',
      '2021-03-21T00:00:00.000z',
      '2021-03-23T00:00:00.000z',
      '2021-03-25T00:00:00.000z',
      '2021-03-28T00:00:00.000z',
      '2021-04-01T00:00:00.000z',
      '2021-04-05T00:00:00.000z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
} as ApexOptions;
