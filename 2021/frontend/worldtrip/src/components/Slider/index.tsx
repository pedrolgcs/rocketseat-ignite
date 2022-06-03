import Link from 'next/link';
import { Flex, Heading, Text } from '@chakra-ui/react';
import SwiperCore, {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// swiper inicialize
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

type Continent = {
  id: number;
  name: string;
  description: string;
  img_url: string;
};

type SliderProps = {
  continents: Continent[];
};

const Slider = ({ continents }: SliderProps) => {
  return (
    <Flex
      w="100%"
      h={['250px', '450px']}
      maxW="1240px"
      mt={['9', '20']}
      mx="auto"
      mb={['5', '10']}
    >
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
        }}
      >
        {continents.map((continent) => (
          <SwiperSlide key={continent.id.toString()}>
            <Flex
              w="100%"
              h="100%"
              justify="center"
              direction="column"
              bgImage={continent.img_url}
              bgPosition="100% 30%"
              bgRepeat="no-repeat"
              bgSize="cover"
              textAlign="center"
            >
              <Link href={`/continent/${continent.id}`}>
                <a>
                  <Heading
                    fontSize={['3xl', '4xl', '5xl']}
                    color="gray.100"
                    fontWeight="bold"
                  >
                    {continent.name}
                  </Heading>
                </a>
              </Link>
              <Text
                fontWeight="bold"
                color="gray.300"
                maxW="70%"
                mx="auto"
                fontSize={['0.8rem', '1xl', '2xl']}
                mt={['4', '6']}
              >
                {continent.description}
              </Text>
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  );
};

export { Slider };
