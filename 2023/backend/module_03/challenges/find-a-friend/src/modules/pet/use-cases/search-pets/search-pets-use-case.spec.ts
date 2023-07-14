import { describe, it, expect, beforeEach } from 'vitest'
import { OrganizationFactory } from '@/modules/organization/helpers/factories'
import { InMemoryOrganizationsRepository } from '@/modules/organization/repositories/in-memory'
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
    const organization = OrganizationFactory.default()

    await organizationsRepository.create(organization)

    const { pets } = await sut.execute({
      city: 'Acari',
    })

    expect(pets).toHaveLength(2)
  })
})
