export interface Validator {
  name: string;
  chainsValidating: number;
  totalRevenue: number;
  totalShared: number;
}

export interface MevValidator {
  name: string;
  skip: string;
  totalRevenue: number;
  totalShared: number;
  wallets: number;
  keep: number;
  chainsValidating: number;
}
