import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function resetDatabase() {
  await prisma.member.deleteMany()
  await prisma.project.deleteMany()
  await prisma.organization.deleteMany()
  await prisma.user.deleteMany()
}

type CreateUser = {
  name?: string
  email?: string
  password?: string
  avatarUrl?: string
}

async function createUser(data: CreateUser) {
  const { name, email, password, avatarUrl } = data

  const sharedPassword = await hash(password ?? '123456', 1)

  const user = await prisma.user.create({
    data: {
      name: name ?? faker.person.fullName(),
      email: email ?? faker.internet.email(),
      avatarUrl: avatarUrl ?? faker.image.avatarGitHub(),
      passwordHash: sharedPassword,
    },
  })

  return user
}

type CreateOrganization = {
  ownerId: string
  name?: string
  slug?: string
  domain?: string
  shouldAttachUsersByDomain?: boolean
}

async function createOrganization(data: CreateOrganization) {
  const {
    ownerId,
    name,
    slug,
    domain,
    shouldAttachUsersByDomain = false,
  } = data

  const organization = await prisma.organization.create({
    data: {
      name: name ?? 'Acme Inc (admin)',
      domain,
      slug: slug ?? 'acme-admin',
      avatarUrl: faker.image.avatarGitHub(),
      shouldAttachUsersByDomain,
      ownerId,
    },
  })

  return organization
}

async function createProject(organizationId: string, ownerId: string) {
  const project = await prisma.project.create({
    data: {
      name: faker.lorem.words(5),
      slug: faker.lorem.slug(5),
      description: faker.lorem.paragraph(),
      avatarUrl: faker.image.avatarGitHub(),
      organizationId,
      ownerId,
    },
  })

  return project
}

async function createMember(
  organizationId: string,
  userId: string,
  role: 'ADMIN' | 'MEMBER' | 'BILLING',
) {
  const member = await prisma.member.create({
    data: {
      organizationId,
      userId,
      role,
    },
  })

  return member
}

async function seed() {
  await resetDatabase()

  const [johnDoe, randomOne, randomTwo] = await Promise.all([
    createUser({
      name: 'John Doe',
      email: 'johndoe@acme.com',
      avatarUrl: 'https://github.com/pedrolgcs.png',
    }),

    createUser({
      name: 'Random One',
    }),

    createUser({
      name: 'Random Two',
    }),
  ])

  const [adminOrg, memberOrg, billingOrg] = await Promise.all([
    createOrganization({
      name: 'Acme Inc (admin)',
      domain: 'acme.com',
      slug: 'acme-admin',
      shouldAttachUsersByDomain: true,
      ownerId: johnDoe.id,
    }),

    createOrganization({
      name: 'Acme Inc (member)',
      slug: 'acme-member',
      ownerId: johnDoe.id,
    }),

    createOrganization({
      name: 'Acme Inc (billing)',
      slug: 'acme-billing',
      ownerId: johnDoe.id,
    }),
  ])

  for (let i = 0; i < 3; i++) {
    await Promise.all([
      createProject(
        adminOrg.id,
        faker.helpers.arrayElement([johnDoe.id, randomOne.id, randomTwo.id]),
      ),
      createProject(
        memberOrg.id,
        faker.helpers.arrayElement([johnDoe.id, randomOne.id, randomTwo.id]),
      ),
      await createProject(
        billingOrg.id,
        faker.helpers.arrayElement([johnDoe.id, randomOne.id, randomTwo.id]),
      ),
    ])
  }

  await Promise.all([
    createMember(adminOrg.id, johnDoe.id, 'ADMIN'),
    createMember(adminOrg.id, randomOne.id, 'MEMBER'),
    createMember(adminOrg.id, randomTwo.id, 'MEMBER'),

    createMember(memberOrg.id, johnDoe.id, 'MEMBER'),
    createMember(memberOrg.id, randomOne.id, 'ADMIN'),
    createMember(memberOrg.id, randomTwo.id, 'MEMBER'),

    createMember(billingOrg.id, johnDoe.id, 'BILLING'),
    createMember(billingOrg.id, randomOne.id, 'MEMBER'),
    createMember(billingOrg.id, randomTwo.id, 'ADMIN'),
  ])
}

seed()
