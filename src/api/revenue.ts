import { ChainsRevenue, MevRevenue } from '@/types';
import * as mockApi from './mockApi';

function parseMevRevenue(obj: any): MevRevenue {
  return {
    date: obj.date,
    revenue: obj.revenue,
  };
}

export function getMevRevnue(): Promise<MevRevenue[]> {
  return mockApi
    .get('skip_enabled_mev_revenue')
    .then((resp) => resp.revenue.map(parseMevRevenue));
}

function parseChainsRevenue(obj: any): ChainsRevenue {
  return {
    osmosis: obj.osmosis,
    atom: obj.atom,
    juno: obj.juno,
    evmos: obj.evmos,
  };
}

export function getChainsRevenue(): Promise<ChainsRevenue> {
  return mockApi
    .get('skip_enabled_revenue_chains')
    .then((resp) => parseChainsRevenue(resp.revenue));
}
