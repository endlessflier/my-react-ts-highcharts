import { computed, makeObservable } from 'mobx';
import { MainStore } from './MainStore';

export class BarChartStore {
  private mainStore: MainStore;

  constructor(mainStore: MainStore) {
    makeObservable(this, {
      chartOptions: computed,
    });

    this.mainStore = mainStore;
  }

  get chartOptions() {
    const revenue = this.mainStore.mevRevenue;
    return {
      chart: {
        type: 'column',
        backgroundColor: 'rgba(243, 246, 248, 0.03)',
        borderRadius: 8,
      },
      title: { text: '' },
      xAxis: {
        tickWidth: 0,
        labels: {
          style: {
            color: 'rgba(243, 246, 248, 0.6)',
          },
        },
        categories: revenue.map((item) => {
          const items = item.date.split(' ');
          const month = items[0].substr(0, 3).toUpperCase();
          const year = items[1];
          if (month === 'JAN') return year;
          if (month === 'APR' || month === 'JUL' || month === 'OCT') return month;
          return '';
        }),
      },
      yAxis: {
        gridLineWidth: 1,
        gridLineDashStyle: 'dash',
        gridLineColor: 'rgba(243, 246, 248, 0.1)',
        title: {
          text: '',
          style: {
            color: '#fff',
          },
        },
        labels: {
          // formatter: function () {
          //   return Highcharts.numberFormat(this.value, 0, '', ',');
          // },
          style: {
            color: 'rgba(243, 246, 248, 0.6)',
          },
        },
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        valuePrefix: '',
      },
      plotOptions: {
        column: {
          borderRadius: 0,
          pointPadding: 0,
          groupPadding: 0.05,
        },
        series: {
          color: 'rgba(243, 246, 248, 0.15)',
        },
      },
      series: [
        {
          name: 'Revenue',
          data: revenue.map((item) => item.revenue),
          borderWidth: 0,
        },
      ],
    };
  }
}
