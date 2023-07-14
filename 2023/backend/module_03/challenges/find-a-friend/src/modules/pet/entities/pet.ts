import { Entity } from '@/core/domain'
import { Organization } from '@/modules/organization/entities'
import {
  Age,
  EnergyLevel,
  IndependenceLevel,
  NecessarySpace,
  Size,
  Category,
} from '@/types/Pet'

type PetProps = {
  name: string
  about: string
  category: Category
  age: Age
  size: Size
  energy_level: EnergyLevel
  independence_level: IndependenceLevel
  necessarySpace: NecessarySpace
  organization: Organization
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

  get name(): string {
    return this.props.name
  }

  set name(value: string) {
    this.props.name = value
  }

  get about(): string {
    return this.props.about
  }

  set about(value: string) {
    this.props.about = value
  }

  get category(): string {
    return this.props.category
  }

  set category(value: Category) {
    this.props.category = value
  }

  get age(): Age {
    return this.props.age
  }

  set age(value: Age) {
    this.props.age = value
  }

  get size(): Size {
    return this.props.size
  }

  set size(value: Size) {
    this.props.size = value
  }

  get energyLevel(): EnergyLevel {
    return this.props.energy_level
  }

  set energyLevel(value: EnergyLevel) {
    this.props.energy_level = value
  }

  get independenceLevel(): IndependenceLevel {
    return this.props.independence_level
  }

  set independenceLevel(value: IndependenceLevel) {
    this.props.independence_level = value
  }

  get necessarySpace(): NecessarySpace {
    return this.props.necessarySpace
  }

  set necessarySpace(value: NecessarySpace) {
    this.props.necessarySpace = value
  }

  get organization(): Organization {
    return this.props.organization
  }

  set organization(value: Organization) {
    this.props.organization = value
  }

  get createdAt(): Date {
    return this.props.createdAt!
  }

  set createdAt(value: Date) {
    this.props.createdAt = value
  }
}

export { Pet }
