import { Entity } from '@/core/domain'

export type AdoptionRequirementProps = {
  requirement: string
  petId: string
}

class AdoptionRequirement extends Entity<AdoptionRequirementProps> {
  private constructor(props: AdoptionRequirementProps, id?: string) {
    super(props, id)
  }

  public static create(props: AdoptionRequirementProps, id?: string) {
    return new AdoptionRequirement(
      {
        ...props,
      },
      id,
    )
  }

  get requirement(): string {
    return this.props.requirement
  }

  set requirement(value: string) {
    this.props.requirement = value
  }

  get petId(): string {
    return this.props.petId
  }

  set petId(value: string) {
    this.props.petId = value
  }
}

export { AdoptionRequirement }
