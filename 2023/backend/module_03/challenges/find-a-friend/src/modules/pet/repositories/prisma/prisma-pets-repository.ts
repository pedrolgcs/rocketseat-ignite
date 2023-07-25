import { prisma } from '@/lib/prisma'
import { PrismaPetMapper } from '@/modules/pet/mappers'
import { Pet } from '../../entities'
import { PetsRepository, SearchManyParams } from '../pets-repository'

class PrismaPetsRepository implements PetsRepository {
  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      include: {
        organization: true,
      },
    })

    if (!pet) {
      return null
    }

    const petToDomain = PrismaPetMapper.toDomain(pet)

    return petToDomain
  }

  async searchMany(params: SearchManyParams): Promise<Pet[]> {
    const { city, age, category, energyLevel, independenceLevel, size } = params

    const pets = await prisma.pet.findMany({
      where: {
        organization: {
          city,
        },
        age: age || undefined,
        category: category || undefined,
        energy_level: energyLevel || undefined,
        independence_level: independenceLevel || undefined,
        size: size || undefined,
      },
      include: {
        organization: true,
      },
    })

    const petsToDomain = pets.map((pet) => {
      const petToDomain = PrismaPetMapper.toDomain(pet)

      return petToDomain
    })

    return petsToDomain
  }

  async create(pet: Pet): Promise<void> {
    const petToDomain = PrismaPetMapper.toPrisma(pet)

    await prisma.pet.create({
      data: petToDomain,
    })
  }
}

export { PrismaPetsRepository }
