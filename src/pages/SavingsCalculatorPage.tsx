import { ProductList, CalculationResult, UserInput } from 'features/savings/components/index';
import { useAmountInput, useSavingsProduct } from 'features/savings/hooks/index';
import { Suspense, useState } from 'react';
import { Spacing } from 'tosslib';
import { SavingsProduct, TabType } from 'features/savings/types/savings';
import { filterProducts, getRecommendedProducts } from 'utils/filter';

export function SavingsCalculatorPage() {
  const { data: products } = useSavingsProduct();
  const {
    amount: targetAmount,
    displayAmount: targetAmountDisplay,
    onChange: handletargetAmountInput,
  } = useAmountInput();
  const {
    amount: monthlyAmount,
    displayAmount: monthlyAmountDisplay,
    onChange: handlemonthlyAmountInput,
  } = useAmountInput();
  const [savingTerm, setSavingTerm] = useState(12);
  const [selectedProduct, setSelectedProduct] = useState<SavingsProduct | null>(null);
  const [selectedTab, setSelectedTab] = useState<TabType>('products');

  const filteredProducts = filterProducts(products, monthlyAmount, savingTerm);
  const recommendedProducts = getRecommendedProducts(filteredProducts);

  return (
    <>
      <UserInput
        targetAmountDisplay={targetAmountDisplay}
        monthlyAmountDisplay={monthlyAmountDisplay}
        savingTerm={savingTerm}
        selectedTab={selectedTab}
        onTargetAmountChange={handletargetAmountInput}
        onMonthlyAmountChange={handlemonthlyAmountInput}
        onSavingTermChange={setSavingTerm}
        onTabChange={setSelectedTab}
      />

      {selectedTab === 'products' ? (
        <Suspense fallback={<div>Loading...</div>}>
          <ProductList
            filteredProducts={filteredProducts}
            selectedProduct={selectedProduct}
            onProductSelect={setSelectedProduct}
          />
        </Suspense>
      ) : (
        <>
          <Spacing size={8} />
          <CalculationResult
            selectedProduct={selectedProduct}
            targetAmount={targetAmount}
            monthlyAmount={monthlyAmount}
            savingTerm={savingTerm}
            recommendedProducts={recommendedProducts}
            onProductSelect={setSelectedProduct}
          />

          <Spacing size={40} />
        </>
      )}
    </>
  );
}
