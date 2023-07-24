import { describe, it, expect, beforeEach } from 'vitest'
import { OrganizationBuilder } from '@/modules/organization/helpers/builders'
import { InMemoryOrganizationsRepository } from '@/modules/organization/repositories/in-memory'
import { PetBuilder } from '@/modules/pet/helpers/builders'
import { InMemoryPetsRepository } from '@/modules/pet/repositories/in-memory'
import { SearchPetsUseCase } from './search-pets-use-case'

let sut: SearchPetsUseCase
let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationsRepository

describe('[Pet] Search pets', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search pets by city', async () => {
    const firstOrganization = new OrganizationBuilder().setCity('Acari').build()
    const secondOrganization = new OrganizationBuilder()
      .setCity('Acari')
      .build()

    const firstPet = new PetBuilder(undefined, firstOrganization).build()
    const secondPet = new PetBuilder(undefined, secondOrganization).build()

    await Promise.all([
      organizationsRepository.create(firstOrganization),
      organizationsRepository.create(secondOrganization),
      petsRepository.create(firstPet),
      petsRepository.create(secondPet),
    ])

    const { pets } = await sut.execute({
      city: 'Acari',
    })

    expect(pets).toHaveLength(2)
  })

  it('should be able to search pets using filters', async () => {
    const organization = new OrganizationBuilder().setCity('Acari').build()

    const firstPet = new PetBuilder(undefined, organization)
      .setAge('senior')
      .build()
    const secondPet = new PetBuilder(undefined, organization)
      .setAge('adult')
      .build()

    await Promise.all([
      await organizationsRepository.create(organization),
      await petsRepository.create(firstPet),
      await petsRepository.create(secondPet),
    ])

    const { pets } = await sut.execute({
      city: 'Acari',
      age: 'adult',
    })

    expect(pets).toHaveLength(1)
  })
})
