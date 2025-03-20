export interface IDebtOverview {
    totalDebtUSD: number;
    externalDebtUSD: number;
    domesticDebtUSD: number;
    debtPercentageToGDP: number;
}

export interface IHistoricalDebt {
    year: number;
    totalDebtUSD: number;
    debtPercentageToGDP: number;
}

export interface IDebtSource {
    creditor: string;
    amountUSD: number;
}

// export interface IDateRange {
//     start: number;
//     end: number;
//     toString(): `${number}:${number}`;
// }
