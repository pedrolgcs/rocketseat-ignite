import crypto from 'node:crypto'
import { Organization } from '@/modules/organization/entities'
import { AdoptionRequirement, Image, Pet } from '@/modules/pet/entities'
import {
  Age,
  Category,
  EnergyLevel,
  IndependenceLevel,
  NecessarySpace,
  Size,
} from '@/types/Pet'

class PetBuilder {
  private pet: Pet

  constructor(id: string = crypto.randomUUID(), organization: Organization) {
    this.pet = Pet.create(
      {
        name: 'name',
        about: 'about',
        age: 'young',
        category: 'cat',
        energyLevel: 'high',
        independenceLevel: 'medium',
        necessarySpace: 'medium',
        adoptionRequirements: [],
        images: [],
        size: 'medium',
        organization,
      },
      id,
    )
  }

  public setName(name: string): this {
    this.pet.name = name
    return this
  }

  public setAbout(about: string): this {
    this.pet.about = about
    return this
  }

  public setAge(age: Age): this {
    this.pet.age = age
    return this
  }

  public setCategory(category: Category): this {
    this.pet.category = category
    return this
  }

  public setEnergyLevel(energyLevel: EnergyLevel): this {
    this.pet.energyLevel = energyLevel
    return this
  }

  public setIndependenceLevel(independenceLevel: IndependenceLevel): this {
    this.pet.independenceLevel = independenceLevel
    return this
  }

  public setNecessarySpace(necessarySpace: NecessarySpace): this {
    this.pet.necessarySpace = necessarySpace
    return this
  }

  public setSize(size: Size): this {
    this.pet.size = size
    return this
  }

  public setOrganization(organization: Organization): this {
    this.pet.organization = organization
    return this
  }

  public setAdoptionRequirement(
    adoptionRequirement: AdoptionRequirement[],
  ): this {
    this.pet.adoptionRequirements = adoptionRequirement
    return this
  }

  public setImages(images: Image[]): this {
    this.pet.images = images
    return this
  }

  public setCreatedAt(createdAt: Date): this {
    this.pet.createdAt = createdAt
    return this
  }

  public build(): Pet {
    return this.pet
  }
}

export { PetBuilder }
