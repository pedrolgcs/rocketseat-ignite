import { registerRestaurantMock } from './api/mocks/register-restaurant-mock'
import { signInMock } from './api/mocks/sign-in-mock'

export { SignInForm } from './components/sign-in-form'
export { SignUpForm } from './components/sign-up-form'

export const authenticationHttpMocks = [registerRestaurantMock, signInMock]
