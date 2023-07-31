import { AdoptionRequirement } from '@/modules/pet/entities'

class AdoptionRequirementBuilder {
  private adoptionRequirement: AdoptionRequirement

  constructor(id: string = crypto.randomUUID(), petId: string) {
    this.adoptionRequirement = AdoptionRequirement.create(
      {
        requirement: 'requirement',
        petId,
      },
      id,
    )
  }

  public setRequirement(requirement: string): this {
    this.adoptionRequirement.requirement = requirement
    return this
  }

  public build(): AdoptionRequirement {
    return this.adoptionRequirement
  }
}

export { AdoptionRequirementBuilder }
