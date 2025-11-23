import { CalculationResult } from 'components/calculationResult';
import { ProductList } from 'components/ProductList';
import { UserInput } from 'components/UserInput';
import { useAmountInput } from 'hooks/useAmountInput';
import { useSavingsProduct } from 'hooks/useSavingsProducts';
import { useState } from 'react';
import { Spacing } from 'tosslib';
import { SavingsProduct, TabType } from 'types/types';
import { filterProducts, getRecommendedProducts } from 'utils/filter';

export function SavingsCalculatorPage() {
  const { products, loading, error } = useSavingsProduct();
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

  if (loading) return <div>상품 목록 불러오는 중...</div>;
  if (error) return <div>Error</div>;

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
        <ProductList
          filteredProducts={filteredProducts}
          selectedProduct={selectedProduct}
          onProductSelect={setSelectedProduct}
        />
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
