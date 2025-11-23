import { Assets, colors, ListRow } from 'tosslib';
import { ProductListProps } from 'types/types';
import { formatCurrency } from 'utils/formatter';

export function ProductList({ filteredProducts, selectedProduct, onProductSelect }: ProductListProps) {
  return (
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
              onClick={() => onProductSelect(product)}
            />
          );
        })
      )}
    </>
  );
}
