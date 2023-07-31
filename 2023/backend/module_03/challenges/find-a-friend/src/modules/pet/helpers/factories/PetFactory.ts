import { Organization } from '@/modules/organization/entities'
import { OrganizationFactory } from '@/modules/organization/helpers/factories'
import {
  Pet,
  AdoptionRequirement,
  Image,
  PetProps,
} from '@/modules/pet/entities'
import {
  Age,
  Category,
  EnergyLevel,
  IndependenceLevel,
  NecessarySpace,
  Size,
} from '@/types/Pet'
import { PetBuilder } from '../builders'

type PetFields = PetProps & {
  id?: string
  organization: Organization
}

class PetFactory {
  static default(): Pet {
    const organization = OrganizationFactory.default()

    return new PetBuilder(undefined, organization).build()
  }

  static createPetFromFields({
    id,
    name,
    about,
    age,
    category,
    energyLevel,
    independenceLevel,
    necessarySpace,
    size,
    organization,
    adoptionRequirements = [],
    images = [],
    createdAt,
  }: PetFields): Pet {
    return new PetBuilder(id, organization)
      .setName(name)
      .setAbout(about)
      .setAge(age)
      .setCategory(category)
      .setEnergyLevel(energyLevel)
      .setIndependenceLevel(independenceLevel)
      .setAdoptionRequirement(adoptionRequirements)
      .setImages(images)
      .setNecessarySpace(necessarySpace)
      .setSize(size)
      .setCreatedAt(createdAt || new Date())
      .build()
  }

  static createRandomPets(count: number, organization: Organization): Pet[] {
    const pets = []

    const age: Age[] = ['young', 'adult', 'senior']
    const energyLevel: EnergyLevel[] = [
      'very_low',
      'low',
      'medium',
      'high',
      'very_high',
    ]
    const independenceLevel: IndependenceLevel[] = ['low', 'medium', 'high']
    const size: Size[] = ['small', 'medium', 'large']
    const category: Category[] = ['cat', 'dog', 'other']
    const necessarySpace: NecessarySpace[] = ['small', 'medium', 'large']

    for (let index = 0; index < count; index++) {
      const petId = index.toString()

      const adoptionRequirement = AdoptionRequirement.create({
        requirement: 'requirement',
        petId,
      })

      const image = Image.create({
        name: 'image.jpeg',
        petId,
      })

      pets.push(
        new PetBuilder(petId, organization)
          .setName(`name ${index}`)
          .setAbout(`about ${index}`)
          .setAge(age[Math.random() * age.length])
          .setCategory(category[Math.random() * category.length])
          .setEnergyLevel(energyLevel[Math.random() * energyLevel.length])
          .setIndependenceLevel(
            independenceLevel[Math.random() * independenceLevel.length],
          )
          .setAdoptionRequirement([adoptionRequirement])
          .setImages([image])
          .setNecessarySpace(
            necessarySpace[Math.random() * necessarySpace.length],
          )
          .setSize(size[Math.random() * size.length])
          .setCreatedAt(new Date())
          .build(),
      )
    }

    return pets
  }
}

export { PetFactory }
