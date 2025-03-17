export class DebtHistory {
  id: number;
  year: number;
  totalDebtUSD: bigint;
  debtToGDP: number;
  createdAt: Date;

  constructor(
    id: number,
    year: number,
    totalDebtUSD: bigint,
    debtToGDP: number,
    createdAt: Date
  ) {
    this.id = id;
    this.year = year;
    this.totalDebtUSD = totalDebtUSD;
    this.debtToGDP = debtToGDP;
    this.createdAt = createdAt;
  }
}
