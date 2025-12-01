import { SavingsProduct } from 'features/savings/types/savings';
import { http } from 'tosslib';

export async function getSavingsProduct(): Promise<SavingsProduct[]> {
  return http.get<SavingsProduct[]>('/api/savings-products');
}
