import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createCheckout } from '@/requests/products';

export function useMutationCreateCheckout() {
  return useMutation(createCheckout, {
    onError: () => {
      toast.error('Ops! Ocorreu um error, por favor tente novamente!');
    },
  });
}
