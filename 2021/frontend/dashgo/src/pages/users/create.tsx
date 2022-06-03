import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Box,
  Flex,
  Heading,
  Divider,
  VStack,
  SimpleGrid,
  HStack,
  Button,
  FormControl,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// services
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';

// components
import { Header } from '../../components/Header';
import { SideBar } from '../../components/SideBar';
import { Input } from '../../components/Form/Input';

const createUserFormSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  email: yup
    .string()
    .email('Informe um e-mail válido')
    .required('E-mail obrigatório'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais'),
});

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function UserCreate() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema),
  });

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const { data } = await api.post<{ user: Record<string, unknown> }>(
        '/users',
        {
          user: {
            ...user,
            created_at: new Date(),
          },
        }
      );

      return data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
      },
    }
  );

  const onSubmit: SubmitHandler<CreateUserFormData> = async (data) => {
    await createUser.mutateAsync(data);
    router.push('/users');
  };

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxW="1480px" mx="auto" px="6">
        <SideBar />

        <Box
          onSubmit={handleSubmit(onSubmit)}
          as="form"
          flex="1"
          borderRadius="8"
          bg="gray.800"
          p={['6', '8']}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuários
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="6">
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <FormControl id="name">
                <Input
                  id="name"
                  {...register('name')}
                  error={errors.name}
                  label="Nome"
                />
              </FormControl>
              <FormControl id="email">
                <Input
                  id="email"
                  {...register('email')}
                  error={errors.email}
                  type="email"
                  label="E-mail"
                />
              </FormControl>
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <FormControl id="password">
                <Input
                  id="password"
                  {...register('password')}
                  error={errors.password}
                  type="password"
                  label="Senha"
                />
              </FormControl>

              <FormControl id="password_confirmation">
                <Input
                  id="password_confirmation"
                  {...register('password_confirmation')}
                  error={errors.password_confirmation}
                  type="password"
                  label="Confirmação de senha"
                />
              </FormControl>
            </SimpleGrid>
          </VStack>

          <Flex mt="7" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button
                  as="a"
                  colorScheme="whiteAlpha"
                  isLoading={isSubmitting}
                >
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" colorScheme="pink">
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
