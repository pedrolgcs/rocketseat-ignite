import { describe, it, expect, beforeEach } from 'vitest'
import * as Error from '@/errors/shared'
import { OrganizationFactory } from '@/modules/organization/helpers/factories'
import { InMemoryOrganizationsRepository } from '@/modules/organization/repositories/in-memory'
import { InMemoryPetsRepository } from '@/modules/pet/repositories/in-memory'
import { CreatePetUseCase } from './create-pet-use-case'

let sut: CreatePetUseCase
let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationsRepository

describe('[Pet] Create pet', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new CreatePetUseCase(petsRepository, organizationsRepository)
  })

  it('should be able to create a new pet', async () => {
    const organization = OrganizationFactory.default()

    await organizationsRepository.create(organization)

    const { pet } = await sut.execute({
      name: 'name',
      about: 'about',
      category: 'cat',
      age: 'young',
      size: 'small',
      energy_level: 'medium',
      independence_level: 'medium',
      necessarySpace: 'medium',
      organization_id: organization.id,
    })

    expect(pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        organization: expect.objectContaining({
          id: organization.id,
        }),
      }),
    )
  })

  it('should not be able to create a pet if organization does not exists', async () => {
    await expect(() =>
      sut.execute({
        name: 'name',
        about: 'about',
        category: 'cat',
        age: 'young',
        size: 'small',
        energy_level: 'medium',
        independence_level: 'medium',
        necessarySpace: 'medium',
        organization_id: 'non_exists',
      }),
    ).rejects.toBeInstanceOf(Error.OrganizationNotFound)
  })
})
