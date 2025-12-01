import { SavingsProduct } from 'features/savings/types/savings';

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

export function getRecommendedProducts(products: SavingsProduct[]): SavingsProduct[] {
  return [...products].sort((a, b) => b.annualRate - a.annualRate).slice(0, 2);
}
