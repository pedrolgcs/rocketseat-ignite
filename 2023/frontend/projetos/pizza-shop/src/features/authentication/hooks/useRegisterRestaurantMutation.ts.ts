import { useMutation } from '@tanstack/react-query'

import { registerRestaurant } from '../api/register-restaurant'

export const useRegisterRestaurantMutation = () => {
  return useMutation({
    mutationFn: registerRestaurant,
  })
}
