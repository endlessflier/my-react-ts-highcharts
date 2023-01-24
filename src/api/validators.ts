import { Validator } from '@/types';
import * as mockApi from './mockApi';

function parseValidator(obj: any): Validator {
  return {
    name: obj.Name,
    chainsValidating: obj.NumberOfChainsValidating,
    totalRevenue: obj.TotalMEVRevenue,
    totalShared: obj.TotalMEVShared,
  };
}

export function get(): Promise<Validator[]> {
  return mockApi
    .get('top_mev_validators')
    .then((resp) => resp.validator_infos.map(parseValidator));
}
