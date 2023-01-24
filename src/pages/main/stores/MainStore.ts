import { action, computed, makeObservable, observable } from 'mobx';
import {
  Chains,
  ChainsMap,
  ChainsRevenue,
  MevValidator,
  MevRevenue,
  SelectOption,
  Stats,
  Validator,
} from '@/types';
import { revenueApi, statsApi, validatorApi } from '@/api';
import { BarChartStore } from './BarChartStore';
import { PieChartStore } from './PieChartStore';
import { orderBy } from 'lodash';

export type TimeSort = 'all' | 'today' | 'week' | 'month' | 'last-year';

const SortOptions: SelectOption[] = [
  { value: 'all', label: 'All time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'last-year', label: 'Last year' },
];

export class MainStore {
  validators: Validator[] = [];
  stats: Stats | null = null;
  mevRevenue: MevRevenue[] = [];
  chainsRevenue: ChainsRevenue | null = null;
  barChartSortby: TimeSort = 'week';
  pieChartSortby: TimeSort = 'today';
  statsSortby: TimeSort = 'last-year';
  validatorsSortby: TimeSort = 'all';

  barChartStore: BarChartStore;
  pieChartStore: PieChartStore;

  search: string = '';
  filter: string = '';

  constructor() {
    makeObservable(this, {
      // NOTE: Sort by
      sortOptions: computed,
      barChartSortby: observable,
      setBarChartSortby: action,
      pieChartSortby: observable,
      setPieChartSortby: action,
      statsSortby: observable,
      setStatsSortby: action,
      validatorsSortby: observable,
      setValidatorsSortby: action,

      // NOTE: status
      validators: observable,
      topValidators: computed,
      topMevValidators: computed,
      stats: observable,
      statsSaved: computed,
      statsWallets: computed,
      mevRevenue: observable,
      chainsRevenue: observable,
      chains: computed,

      search: observable,
      setSearch: action,
      filter: observable,
      setFilter: action,
    });

    this.fetchData();
    this.barChartStore = new BarChartStore(this);
    this.pieChartStore = new PieChartStore(this);
  }

  get sortOptions(): SelectOption[] {
    return SortOptions;
  }

  setBarChartSortby(newValue: TimeSort): void {
    this.barChartSortby = newValue;
  }

  setPieChartSortby(newValue: TimeSort): void {
    this.pieChartSortby = newValue;
  }

  setStatsSortby(newValue: TimeSort): void {
    this.statsSortby = newValue;
  }

  setValidatorsSortby(newValue: TimeSort): void {
    this.validatorsSortby = newValue;
  }

  convertNumber(value: number, prefix = ''): string {
    if (value >= 1000000000) return `${prefix}${(value / 1000000000).toFixed(1)}b`;
    else if (value >= 1000000) return `${prefix}${(value / 1000000).toFixed(1)}m`;
    else if (value >= 1000) return `${prefix}${(value / 1000).toFixed(1)}k`;
    else return `${prefix}${value}`;
  }

  setSearch(newValue: string): void {
    this.search = newValue;
  }

  setFilter(newValue: string): void {
    this.filter = newValue;
  }

  get topValidators(): Validator[] {
    return this.validators.slice(0, 5);
  }

  get topMevValidators(): MevValidator[] {
    return this.validators.slice(0, 8).map((validator) => {
      return {
        ...validator,
        skip: 'Yes',
        wallets: Math.ceil(Math.random() * 5000 + 5000),
        keep: Math.ceil((validator.totalShared * 100) / validator.totalRevenue),
      };
    });
  }

  get statsSaved(): string {
    return this.convertNumber(this.stats?.saved ?? 0, '$');
  }

  get statsWallets(): string {
    return this.convertNumber(this.stats?.numberOfWallets ?? 0);
  }

  get chains(): ChainsMap {
    if (!this.chainsRevenue) return [];
    return Object.keys(this.chainsRevenue).map((key) => ({
      name: key as Chains,
      value: this.chainsRevenue?.[key as Chains] ?? 0,
    }));
  }

  private async fetchValidators(): Promise<void> {
    try {
      const validators = await validatorApi.get();
      this.validators = orderBy(validators, ['totalRevenue'], 'desc');
    } catch (e) {
      console.error(e);
    }
  }

  private async fetchStats(): Promise<void> {
    try {
      this.stats = await statsApi.get();
    } catch (e) {
      console.error(e);
    }
  }

  private async fetchMevRevenue(): Promise<void> {
    try {
      this.mevRevenue = await revenueApi.getMevRevnue();
    } catch (e) {
      console.error(e);
    }
  }

  private async fetchChainsRevenue(): Promise<void> {
    try {
      this.chainsRevenue = await revenueApi.getChainsRevenue();
    } catch (e) {
      console.error(e);
    }
  }

  private async fetchData() {
    this.fetchValidators();
    this.fetchStats();
    this.fetchMevRevenue();
    this.fetchChainsRevenue();
  }

  dispose(): void {
    // TBD
    this.fetchValidators();
  }
}
