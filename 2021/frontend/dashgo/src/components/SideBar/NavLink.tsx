import { Link as ChakraLink, Icon, Text, LinkProps } from '@chakra-ui/react';
import { ElementType } from 'react';

// components
import { ActiveLink } from './ActiveLink';

interface NavLinkProps extends LinkProps {
  icon: ElementType;
  name: string;
  href: string;
}

function NavLink({ name, icon, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" alignItems="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {name}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}

export { NavLink };
