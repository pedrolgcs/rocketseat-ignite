import { api } from '@/lib/axios'

export type RegisterRestaurantParams = {
  restaurantName: string
  managerName: string
  email: string
  phone: string
}

export async function registerRestaurant(
  params: RegisterRestaurantParams,
): Promise<void> {
  const { restaurantName, managerName, email, phone } = params
  await api.post('/restaurants', {
    restaurantName,
    managerName,
    email,
    phone,
  })
}
