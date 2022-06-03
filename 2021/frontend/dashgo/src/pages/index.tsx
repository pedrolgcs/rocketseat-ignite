import type { NextPage } from 'next';
import { Flex, Button, Stack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// components
import { Input } from '../components/Form/Input';

const signInFormSchema = yup.object({
  email: yup
    .string()
    .email('Informe um e-mail válido')
    .required('E-mail obrigatório'),
  password: yup.string().required('Senha obrigatória'),
});

type SignInFormData = {
  email: string;
  password: string;
};

const SignIn: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  });

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    console.table(data);
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        maxW="420px"
        bg="gray.800"
        p="8"
        borderRadius="8"
        flexDir="column"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing="4">
          <Input
            type="email"
            label="E-mail"
            {...register('email', {})}
            error={errors.email}
          />
          <Input
            type="password"
            label="Password"
            {...register('password', {})}
            error={errors.password}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
};

export default SignIn;
