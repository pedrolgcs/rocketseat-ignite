import { Box, useBreakpointValue } from '@chakra-ui/react';

// components
import { SideBarNav } from './SideBarNav';
import { DrawerNav } from './DrawerNav';

function SideBar() {
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  });

  if (isDrawerSidebar) {
    return (
      <DrawerNav>
        <SideBarNav />
      </DrawerNav>
    );
  }

  return (
    <Box as="aside" w="64" mr="8">
      <SideBarNav />
    </Box>
  );
}

export { SideBar };
