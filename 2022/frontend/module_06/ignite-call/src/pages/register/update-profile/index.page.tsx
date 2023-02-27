import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  MultiStep,
  Heading,
  Text,
  Button,
  TextArea,
  Avatar,
} from '@pedrolgcs-ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { api } from '@/lib/axios'
import { withSSRAuth } from '@/utils/auth/with-ssr-auth'
import { AppError } from '@/utils/Error'
import * as S from './styles'

const updateProfileFormSchema = z.object({
  bio: z.string(),
})

type UpdateProfileFormInput = z.infer<typeof updateProfileFormSchema>

export default function UpdateProfile() {
  const session = useSession()

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileFormInput>({
    resolver: zodResolver(updateProfileFormSchema),
    defaultValues: {},
  })

  async function handleUpdateProfile(data: UpdateProfileFormInput) {
    try {
      await api.put('/users/profile', {
        bio: data.bio,
      })

      router.push(`/schedule/${session.data?.user.username}`)
    } catch (error) {
      if (error instanceof AppError) {
        toast.error(error.friendlyMessage)
      }
    }
  }

  return (
    <S.Container>
      <S.Header>
        <Heading as="strong">Defina sua disponibilidade</Heading>
        <Text>Por último, uma breve descrição e uma foto de perfil.</Text>

        <MultiStep size={4} currentStep={4} />
      </S.Header>

      <S.ProfileBox>
        <S.UpdateProfileForm onSubmit={handleSubmit(handleUpdateProfile)}>
          <label>
            <Text size="sm">Foto de perfil</Text>
            <Avatar
              src={session.data?.user.avatar_url}
              alt={session.data?.user.name}
            />
          </label>

          <label>
            <Text size="sm">Sobre você</Text>
            <TextArea {...register('bio')} />
            <S.FormAnnotation>
              Fale um pouco sobre você. Isto será exibido em sua página pessoal.
            </S.FormAnnotation>
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Finalizar <ArrowRight />
          </Button>
        </S.UpdateProfileForm>
      </S.ProfileBox>
    </S.Container>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx, session) => {
    return {
      props: {
        session,
      },
    }
  },
)
