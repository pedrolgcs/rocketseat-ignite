import { useState } from 'react';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
  Td,
  Text,
  useBreakpointValue,
  Spinner,
  Link,
} from '@chakra-ui/react';

// components
import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { SideBar } from '../../components/SideBar';

// services
import { queryClient } from '../../services/queryClient';

// hooks
import { useUsers, getUser, getUsers } from '../../services/hooks/useUsers';

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

type UserListProps = {
  users: User[];
};

export default function UserList({ users }: UserListProps) {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useUsers(page, {
    initialData: users,
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  async function handlePrefetchUser(id: number) {
    await queryClient.prefetchQuery(
      ['user', id],
      async () => {
        const user = getUser(id);
        return user;
      },
      {
        staleTime: 1000 * 60 * 10, // 10 minutes
      }
    );
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxW="1480px" mx="auto" px="6">
        <SideBar />

        <Box flex="1" borderRadius="8" bg="gray.800" p="6">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>
            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter os dados do usuário</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={['2', '4', '6']} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th width="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.users.map((user) => (
                    <Tr key={user.id}>
                      <Td px={['2', '4', '6']}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Link
                            color="purple.400"
                            onMouseEnter={() => handlePrefetchUser(user.id)}
                          >
                            <Text fontWeight="bold">{user.name}</Text>
                          </Link>
                          <Text fontSize="sm" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{user.createdAt}</Td>}
                      <Td>
                        <Button
                          as="a"
                          size="sm"
                          fontSize="sm"
                          colorScheme="purple"
                          iconSpacing={isWideVersion ? '1.5' : '-.5'}
                          leftIcon={<Icon as={RiPencilLine} />}
                        >
                          {isWideVersion && 'Editar'}
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <Pagination
                totalCountOfRegisters={data?.totalCount as number}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { users, totalCount } = await getUsers(1);

  return {
    props: {
      users,
    },
  };
};
