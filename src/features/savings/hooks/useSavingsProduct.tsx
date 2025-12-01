import { useSuspenseQuery } from '@tanstack/react-query';
import { getSavingsProduct } from 'api/getSavingsProduct';

export function useSavingsProduct() {
  return useSuspenseQuery({
    queryKey: ['savings-products'],
    queryFn: getSavingsProduct,
  });
}
