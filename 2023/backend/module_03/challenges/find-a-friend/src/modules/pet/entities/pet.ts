import { Entity } from '@/core/domain'

export type Age = 'young' | 'adult' | 'senior'

export type Size = 'small' | 'medium' | 'large'

export type EnergyLevel = 'very_low' | 'low' | 'medium' | 'high' | 'very_high'

export type IndependenceLevel = 'low' | 'medium' | 'high'

export type NecessarySpace = 'small' | 'medium' | 'large'

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
