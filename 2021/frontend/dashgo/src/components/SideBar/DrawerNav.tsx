import { ReactNode } from 'react';
import {
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

// contexts
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';

type DrawerNavProps = {
  children: ReactNode;
};

function DrawerNav({ children }: DrawerNavProps) {
  const { isOpen, onClose } = useSidebarDrawer();

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent bg="gray.800">
          <DrawerCloseButton mt="2" />
          <DrawerHeader>Navegação</DrawerHeader>
          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

export { DrawerNav };
