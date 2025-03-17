export interface DebtOverview {
  totalDebtUSD: number;
  externalDebtUSD: number;
  domesticDebtUSD: number;
  debtPercentageToGDP: number;
}

export interface HistoricalDebt {
  year: number;
  totalDebtUSD: number;
  debtPercentageToGDP: number;
}

export interface DebtSource {
  creditor: string;
  amountUSD: number;
}
