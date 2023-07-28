import { OrganizationViewModel } from '@/modules/organization/view-models'
import { Pet } from '@/modules/pet/entities'
import { AdoptionRequirementsViewModel } from './adoption-requirements-view-model'

class PetViewModel {
  static toHTTP(pet: Pet) {
    return {
      id: pet.id,
      name: pet.name,
      category: pet.category,
      age: pet.age,
      size: pet.size,
      energyLevel: pet.energyLevel,
      independenceLevel: pet.independenceLevel,
      necessarySpace: pet.necessarySpace,
      organization: OrganizationViewModel.toHTTP(pet.organization),
      adoptionRequirements: AdoptionRequirementsViewModel.toHTTP(
        pet.adoptionRequirements,
      ),
      createdAt: pet.createdAt,
    }
  }
}

export { PetViewModel }
