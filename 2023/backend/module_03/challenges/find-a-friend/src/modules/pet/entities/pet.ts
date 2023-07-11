import { Entity } from '@/core/domain'
import {
  Age,
  EnergyLevel,
  IndependenceLevel,
  NecessarySpace,
  Size,
} from '@/types/Pet'

type PetProps = {
  name: string
  about: string
  category: string
  age: Age
  size: Size
  energy_level: EnergyLevel
  independence_level: IndependenceLevel
  necessarySpace: NecessarySpace
  organization_id: string
  createdAt?: Date
}

class Pet extends Entity<PetProps> {
  private constructor(props: PetProps, id?: string) {
    super(props, id)
  }

  public static create(props: PetProps, id?: string) {
    return new Pet(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}

export { Pet }
