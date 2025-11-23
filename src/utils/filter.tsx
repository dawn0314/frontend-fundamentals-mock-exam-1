import { SavingsProduct } from 'types/types';

export function filterProducts(
  products: SavingsProduct[],
  monthlyAmount: string,
  savingTerm: number
): SavingsProduct[] {
  const amount = Number(monthlyAmount);

  return products.filter(product => {
    const isAmountInRange = amount >= product.minMonthlyAmount && amount <= product.maxMonthlyAmount;
    const isTermEqual = savingTerm === product.availableTerms;

    return isAmountInRange && isTermEqual;
  });
}
