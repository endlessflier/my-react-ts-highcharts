import { Stats } from '@/types';
import * as mockApi from './mockApi';

function parseStats(obj: any): Stats {
  return {
    chainsRunningSkip: obj.chains_running_skip,
    validatorsRunningSkip: obj.validators_running_skip,
    saved: obj.saved,
    numberOfWallets: obj.number_of_wallets,
  };
}

export function get(): Promise<Stats> {
  return mockApi.get('skip_stats').then((resp) => parseStats(resp));
}
