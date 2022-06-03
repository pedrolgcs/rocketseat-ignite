import { useEffect, createContext, ReactNode, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';

type SidebarDrawerContextData = UseDisclosureReturn;

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

type SidebarDrawerProviderProps = {
  children: ReactNode;
};

function SidebarDrawerProvider({ children }: SidebarDrawerProviderProps) {
  const disclosure = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath]);

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}

const useSidebarDrawer = () => {
  return useContext(SidebarDrawerContext);
};

export { SidebarDrawerProvider, useSidebarDrawer };
