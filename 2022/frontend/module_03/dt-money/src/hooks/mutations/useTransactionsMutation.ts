import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createNewTransaction } from '@/services/requests/transactions';

export const useMutationCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation(createNewTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(['transactions']);
      toast.success('Transação cadastrada com sucesso');
    },
    onError: () => {
      toast.error('Error ao criar transação');
    },
  });
};
