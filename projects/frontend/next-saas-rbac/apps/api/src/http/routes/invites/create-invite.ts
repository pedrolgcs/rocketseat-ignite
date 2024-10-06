import { roleSchema } from '@saas/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { Nodemailer } from '@/lib/nodemailer/index'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { BadRequestError } from '../_errors/bad-request-error'
import { UnauthorizedError } from '../_errors/unautorized-error'

const bodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  role: roleSchema,
})

const paramsSchema = z.object({
  slug: z.string(),
})

export async function createInvite(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations/:slug/invites',
      {
        schema: {
          tags: ['Invites'],
          summary: 'Create an new invite',
          security: [{ bearerAuth: [] }],
          body: bodySchema,
          params: paramsSchema,
          response: {
            201: z.object({
              inviteId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params

        const { email, role, name } = request.body

        const { id: userId } = await request.getCurrentUser()

        const { membership, organization } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('create', 'Invite')) {
          throw new UnauthorizedError(
            `you're not allowed to create new invites.`,
          )
        }

        const [, domain] = email.split('@')

        if (
          organization.shouldAttachUsersByDomain &&
          organization.domain === domain
        ) {
          throw new BadRequestError(
            `user with "${domain}" domain will join your organization automatically on login.`,
          )
        }

        const inviteWithSameEmail = await prisma.invite.findUnique({
          where: {
            email_organizationId: {
              email,
              organizationId: organization.id,
            },
          },
        })

        if (inviteWithSameEmail) {
          throw new BadRequestError('invite with same e-mail already exists.')
        }

        const memberWithSameEmail = await prisma.member.findFirst({
          where: {
            organizationId: organization.id,
            user: {
              email,
            },
          },
        })

        if (memberWithSameEmail) {
          throw new BadRequestError(
            'a member with this email already belongs to this organization.',
          )
        }

        const invite = await prisma.invite.create({
          data: {
            email,
            role,
            organizationId: organization.id,
            authorId: userId,
          },
        })

        const mailProvider = new Nodemailer('MAILTRAP')

        mailProvider.sendEmail({
          to: {
            name,
            email,
          },
          template: {
            file: 'send-member-invite',
            variables: {
              name,
              organization: organization.name,
              role,
              link: `http://localhost:3000/org/${organization.slug}/invites/${invite.id}`,
            },
          },
          subject: `You have been invited to join ${organization.name}`,
        })

        return reply.status(201).send({ inviteId: invite.id })
      },
    )
}
