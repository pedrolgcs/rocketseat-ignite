import { Flex, IconButton, Icon, useBreakpointValue } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';

// components
import { Profile } from './Profile';
import { Notifications } from './Notifications';
import { Search } from './Search';
import { Logo } from './Logo';

// contexts
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';

function Header() {
  const { onOpen } = useSidebarDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      w="100%"
      maxW="1480px"
      h="20"
      mx="auto"
      mt="4"
      align="center"
      px="6"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="open navigation"
          icon={<Icon as={RiMenuLine} mb="1" />}
          fontSize="24px"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        />
      )}

      <Logo />

      {isWideVersion && <Search />}

      <Flex align="center" ml="auto">
        <Notifications />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}

export { Header };
