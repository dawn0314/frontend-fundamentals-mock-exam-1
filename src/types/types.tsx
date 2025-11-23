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

export interface ProductListProps {
  filteredProducts: SavingsProduct[];
  selectedProduct: SavingsProduct | null;
  onProductSelect: (product: SavingsProduct) => void;
}

export interface UserInputProps {
  targetAmountDisplay: string;
  monthlyAmountDisplay: string;
  savingTerm: number;
  selectedTab: TabType;
  onTargetAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMonthlyAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSavingTermChange: (value: number) => void;
  onTabChange: (value: TabType) => void;
}

export type TabType = 'products' | 'results';
