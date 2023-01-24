import { Fragment, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { capitalize } from 'lodash';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { IconComponent, SortbyLabel, StatLabel } from '@/components';
import { useMainStore } from '../../stores/useMainStore';
import styles from './Overview.module.css';

export const Overview = observer(() => {
  const mainStore = useMainStore();
  const barChartRef = useRef<HighchartsReact.RefObject>(null);
  const pieChartRef = useRef<HighchartsReact.RefObject>(null);

  useEffect(() => {
    barChartRef.current?.chart.reflow();
    pieChartRef.current?.chart.reflow();
  }, []);

  return (
    <div className={styles.overview}>
      <div className={styles.chartBlock}>
        <div className={styles.oneView}>
          <SortbyLabel
            label="Skip Enabled MEV Revenue"
            value={mainStore.barChartSortby}
            options={mainStore.sortOptions}
            onChange={(v) => mainStore.setBarChartSortby(v)}
          />
          <HighchartsReact
            ref={barChartRef}
            containerProps={{ style: { width: '100%', height: '450px', marginTop: 20 } }}
            highcharts={Highcharts}
            options={mainStore.barChartStore.chartOptions}
          />
        </div>
        <div className={styles.oneView}>
          <SortbyLabel
            label="Skip Enabled Revenue - Chains"
            value={mainStore.pieChartSortby}
            options={mainStore.sortOptions}
            onChange={(v) => mainStore.setPieChartSortby(v)}
          />
          <div className={styles.pieChartContainer}>
            <HighchartsReact
              ref={pieChartRef}
              containerProps={{ style: { flex: 1, margin: 'auto' } }}
              highcharts={Highcharts}
              options={mainStore.pieChartStore.chartOptions}
            />
            <Table className={styles.chainsTable}>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Chain</TableCell>
                  <TableCell>Revenue</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mainStore.chains.map((info, idx) => (
                  <TableRow key={info.name}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell style={{ borderRadius: '6px 0 0 6px' }}>
                      <div className={styles.nameWrapper}>
                        <IconComponent type={idx} />
                        <span>{capitalize(info.name)}</span>
                      </div>
                    </TableCell>
                    <TableCell style={{ color: '#33B970', fontSize: 14 }}>${info.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <div className={styles.oneView} style={{ marginTop: 71 }}>
        <SortbyLabel
          label="Skip Stats"
          value={mainStore.statsSortby}
          sortbyHidden
          options={mainStore.sortOptions}
          onChange={(v) => mainStore.setStatsSortby(v)}
        />
        <div className={styles.statContent}>
          <StatLabel label="chains running Skip" value={mainStore.stats?.chainsRunningSkip} />
          <StatLabel
            label="validators running Skip"
            value={mainStore.stats?.validatorsRunningSkip}
          />
          <StatLabel label="saved" value={mainStore.statsSaved} />
          <StatLabel label="wallets" value={mainStore.statsWallets} />
        </div>
      </div>
      <div className={styles.oneView} style={{ marginTop: 71 }}>
        <SortbyLabel
          label="Top MEV Validators"
          value={mainStore.validatorsSortby}
          sortbyHidden
          options={mainStore.sortOptions}
          onChange={(v) => mainStore.setValidatorsSortby(v)}
        />
        <TableContainer className={styles.tableContainer}>
          <Table className={styles.table} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell># chains validating</TableCell>
                <TableCell>Total MEV Revenue</TableCell>
                <TableCell width="50%">Total MEV Shared</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mainStore.topValidators.map((info, idx) => (
                <Fragment key={info.name}>
                  <TableRow>
                    <TableCell style={{ borderRadius: '6px 0 0 6px', fontSize: '13px' }}>
                      <div className={styles.nameWrapper}>
                        <IconComponent type={idx} />
                        <span>{info.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {info.chainsValidating} chain{info.chainsValidating > 1 && 's'}
                    </TableCell>
                    <TableCell>${info.totalRevenue.toLocaleString('en-US')}</TableCell>
                    <TableCell style={{ borderRadius: '0 6px 6px 0' }}>
                      ${info.totalShared.toLocaleString('en-US')}
                    </TableCell>
                  </TableRow>

                  <TableRow className={styles.emptyRow}>
                    <TableCell colSpan={4} />
                  </TableRow>
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
});
