import { AdoptionRequirement } from '@/modules/pet/entities'

class AdoptionRequirementsViewModel {
  static toHTTP(adoptionRequirements: AdoptionRequirement[]) {
    return {
      adoptionRequirements: adoptionRequirements.map((item) => {
        return {
          id: item.id,
          requirement: item.requirement,
        }
      }),
    }
  }
}

export { AdoptionRequirementsViewModel }
