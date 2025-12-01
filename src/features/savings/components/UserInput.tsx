import { Border, NavigationBar, SelectBottomSheet, Spacing, Tab, TextField } from 'tosslib';
import { TabType, UserInputProps } from 'features/savings/types/savings';

const SAVING_TERMS = [6, 12, 24];

export function UserInput({
  targetAmountDisplay,
  monthlyAmountDisplay,
  savingTerm,
  selectedTab,
  onTargetAmountChange,
  onMonthlyAmountChange,
  onSavingTermChange,
  onTabChange,
}: UserInputProps) {
  return (
    <>
      <NavigationBar title="적금 계산기" />
      <Spacing size={16} />
      <TextField
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        value={targetAmountDisplay}
        onChange={onTargetAmountChange}
      />
      <Spacing size={16} />
      <TextField
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        value={monthlyAmountDisplay}
        onChange={onMonthlyAmountChange}
      />
      <Spacing size={16} />
      <SelectBottomSheet
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={savingTerm}
        onChange={value => onSavingTermChange(value)}
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
      <Tab onChange={value => onTabChange(value as TabType)}>
        <Tab.Item value="products" selected={selectedTab === 'products'}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={selectedTab === 'results'}>
          계산 결과
        </Tab.Item>
      </Tab>
    </>
  );
}
