export interface SavingsProduct {
  id: string;
  name: string;
  annualRate: number;
  minMonthlyAmount: number;
  maxMonthlyAmount: number;
  availableTerms: number;
}

export interface CalculationResultProps {
  selectedProduct: SavingsProduct | null;
  targetAmount: string;
  monthlyAmount: string;
  savingTerm: number;
  recommendedProducts: SavingsProduct[];
  onProductSelect: (product: SavingsProduct) => void;
}

export type TabType = 'products' | 'results';
