import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiChevronLeft } from 'react-icons/fi';
import { Flex, Image, Icon } from '@chakra-ui/react';

function Header() {
  let backArrowActive = false;
  const { asPath } = useRouter();

  if (asPath !== '/') {
    backArrowActive = true;
  }

  return (
    <Flex
      as="header"
      h="100px"
      maxW="1140px"
      align="center"
      mx="auto"
      px={['4', '6']}
    >
      {backArrowActive && (
        <Link href="/">
          <a>
            <Icon as={FiChevronLeft} fontSize={['20', '32']} />
          </a>
        </Link>
      )}
      <Image
        w={["140px","200px"]}
        src="/images/logo.svg"
        alt="worldtrip"
        mx="auto"
      />
    </Flex>
  );
}

export { Header };
