import { Flex, Box, Text, Avatar } from '@chakra-ui/react';

type ProfileProps = {
  showProfileData?: boolean;
};

function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Pedro H.</Text>
          <Text color="gray.300" fontSize="small">
            pedro.lg.cs@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Pedro Henrique"
        src="https://github.com/pedrolgcs.png"
      />
    </Flex>
  );
}

export { Profile };
