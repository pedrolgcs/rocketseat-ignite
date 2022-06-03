import { Stack } from '@chakra-ui/react';
import {
  RiDashboardLine,
  RiContactsLine,
  RiInputMethodLine,
  RiGitMergeLine,
} from 'react-icons/ri';

// components
import { NavSection } from './NavSection';
import { NavLink } from './NavLink';

function SideBarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink name="Dashboard" href="/dashboard" icon={RiDashboardLine} />
        <NavLink name="Usuários" href="/users" icon={RiContactsLine} />
      </NavSection>

      <NavSection title="AUTOMAÇÃO">
        <NavLink name="Formulários" href="/forms" icon={RiInputMethodLine} />
        <NavLink name="Automação" href="/automation" icon={RiGitMergeLine} />
      </NavSection>
    </Stack>
  );
}

export { SideBarNav };
