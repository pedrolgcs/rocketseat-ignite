import { getManagedRestaurantMock } from './api/mocks/get-managed-restaurant-mock'
import { getProfileMock } from './api/mocks/get-profile-mock'
import { signOutMock } from './api/mocks/sign-out-mock'
import { updateProfile } from './api/mocks/update-profile-mock'

export { AccountMenu } from './components/account-menu'

export const accountMenuHttpMocks = [
  getManagedRestaurantMock,
  getProfileMock,
  signOutMock,
  updateProfile,
]
