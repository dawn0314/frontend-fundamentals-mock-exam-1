export function calculateExpectedProfit(monthlyAmount: number, savingTerm: number, annualRate: number) {
  return Math.floor(monthlyAmount * savingTerm * (1 + annualRate * 0.5));
}

export function calculateDifference(targetAmount: number, expectedProfit: number) {
  return targetAmount - expectedProfit;
}

export function calculateRecommendedMonthlyAmount(targetAmount: number, savingTerm: number, annualRate: number) {
  return Math.ceil(targetAmount / (savingTerm * (1 + annualRate * 0.5)) / 1000) * 1000; // 1000원단위로 반올림
}
