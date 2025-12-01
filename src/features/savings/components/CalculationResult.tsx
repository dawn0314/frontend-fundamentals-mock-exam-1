import { Assets, Border, colors, ListHeader, ListRow, Spacing } from 'tosslib';
import { CalculationResultProps } from 'features/savings/types/savings';
import { calculateDifference, calculateExpectedProfit, calculateRecommendedMonthlyAmount } from 'utils/calculators';
import { formatCurrency } from 'utils/formatter';

export function CalculationResult({
  selectedProduct,
  targetAmount,
  monthlyAmount,
  savingTerm,
  recommendedProducts,
  onProductSelect,
}: CalculationResultProps) {
  if (!selectedProduct) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해 주세요." />} />;
  }
  const annualRate = selectedProduct.annualRate;
  const expectedProfit = calculateExpectedProfit(Number(monthlyAmount), savingTerm, annualRate);
  const difference = calculateDifference(Number(targetAmount), expectedProfit);
  const recommendedMonthlyAmount = calculateRecommendedMonthlyAmount(Number(targetAmount), savingTerm, annualRate);

  return (
    <>
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="예상 수익 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${formatCurrency(expectedProfit)}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="목표 금액과의 차이"
            topProps={{ color: colors.grey600 }}
            bottom={`${formatCurrency(difference)}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="추천 월 납입 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${formatCurrency(recommendedMonthlyAmount)}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />

      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />
      {recommendedProducts.map(product => {
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
            onClick={() => onProductSelect(product)}
          />
        );
      })}
    </>
  );
}
