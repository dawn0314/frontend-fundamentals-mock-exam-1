import { CalculationResult } from 'components/calculationResult';
import { useAmountInput } from 'hooks/useAmountInput';
import { useSavingsProduct } from 'hooks/useSavingsProducts';
import { useState } from 'react';
import { Assets, Border, colors, ListRow, NavigationBar, SelectBottomSheet, Spacing, Tab, TextField } from 'tosslib';
import { SavingsProduct, TabType } from 'types/types';
import { filterProducts, getRecommendedProducts } from 'utils/filter';
import { formatCurrency } from 'utils/formatter';

const SAVING_TERMS = [6, 12, 24];

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
      <NavigationBar title="적금 계산기" />
      <Spacing size={16} />
      <TextField
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        value={targetAmountDisplay}
        onChange={handletargetAmountInput}
      />
      <Spacing size={16} />
      <TextField
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        value={monthlyAmountDisplay}
        onChange={handlemonthlyAmountInput}
      />
      <Spacing size={16} />
      <SelectBottomSheet
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={savingTerm}
        onChange={value => setSavingTerm(value)}
      >
        {SAVING_TERMS.map(term => (
          <SelectBottomSheet.Option key={term} value={term}>
            {term}개월
          </SelectBottomSheet.Option>
        ))}
      </SelectBottomSheet>
      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />
      <Tab onChange={value => setSelectedTab(value as TabType)}>
        <Tab.Item value="products" selected={selectedTab === 'products'}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={selectedTab === 'results'}>
          계산 결과
        </Tab.Item>
      </Tab>

      {selectedTab === 'products' ? (
        <>
          {filteredProducts.length < 1 ? (
            <ListRow contents={<ListRow.Texts type="1RowTypeA" top="조건에 맞는 상품이 없습니다." />} />
          ) : (
            filteredProducts.map(product => {
              const isSelected = product.id === selectedProduct?.id;
              return (
                <ListRow
                  key={product.id}
                  contents={
                    <ListRow.Texts
                      type="3RowTypeA"
                      top={product.name}
                      topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
                      middle={`연 이자율: ${product.annualRate}%`}
                      middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
                      bottom={`${formatCurrency(product.minMonthlyAmount)}원 ~ ${formatCurrency(product.maxMonthlyAmount)} | ${product.availableTerms}개월`}
                      bottomProps={{ fontSize: 13, color: colors.grey600 }}
                    />
                  }
                  right={isSelected && <Assets.Icon name="icon-check-circle-green" />}
                  onClick={() => setSelectedProduct(product)}
                />
              );
            })
          )}
        </>
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
