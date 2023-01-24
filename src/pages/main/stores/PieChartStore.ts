import { computed, makeObservable } from 'mobx';
import { capitalize } from 'lodash';
import { Chains } from '@/types';
import { MainStore } from './MainStore';
import { ChainsColor } from '../constants';

export class PieChartStore {
  private mainStore: MainStore;

  constructor(mainStore: MainStore) {
    makeObservable(this, {
      chartOptions: computed,
    });

    this.mainStore = mainStore;
  }

  getColor(key: Chains): string {
    if (key === 'osmosis') return ChainsColor.osmosis;
    else if (key === 'atom') return ChainsColor.atom;
    else if (key === 'juno') return ChainsColor.juno;
    else return ChainsColor.evmos;
  }

  get chartOptions() {
    return {
      chart: {
        type: 'pie',
        backgroundColor: 'transparent',
      },
      title: {
        text: '',
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
        },
      },
      series: [
        {
          data: this.mainStore.chains.map((info) => ({
            name: capitalize(info.name),
            y: info.value,
            color: this.getColor(info.name),
          })),
          borderWidth: 0,
        },
      ],
    };
  }
}
