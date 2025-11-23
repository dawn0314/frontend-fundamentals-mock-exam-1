import { ChangeEvent, useState } from 'react';

export function useAmountInput() {
  const [amount, setAmount] = useState('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/,/g, '');

    if (!isNaN(Number(numericValue))) {
      setAmount(numericValue);
    }
  };

  const displayAmount = amount ? Number(amount).toLocaleString('ko-KR') : '';

  return {
    amount,
    onChange: handleInput,
    displayAmount,
  };
}
