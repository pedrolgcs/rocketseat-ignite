import { useMutation } from '@tanstack/react-query'

import { cancelOrder, CancelOrderParams } from '../api/cancel-order'

export const useCancelOrderMutation = () => {
  return useMutation({
    mutationFn: (params: CancelOrderParams) => cancelOrder(params),
  })
}
