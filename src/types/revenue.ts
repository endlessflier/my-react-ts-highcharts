export interface MevRevenue {
  date: string;
  revenue: number;
}

export type Chains = 'osmosis' | 'atom' | 'juno' | 'evmos';

export type ChainsRevenue = Record<Chains, number>;

export type ChainsMap = { name: Chains; value: number }[];
