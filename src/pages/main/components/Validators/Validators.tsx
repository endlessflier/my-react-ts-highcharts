import { Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { SearchField, PaymentStatLabel } from '@/components';
import { useMainStore } from '../../stores/useMainStore';
import styles from './Validators.module.css';

export const Validators = observer(() => {
  const mainStore = useMainStore();

  return (
    <div className={styles.validaorContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <Typography className={styles.title}>Top MEV Validators</Typography>
          <SearchField
            isDarkTheme
            variant="filter"
            value={mainStore.filter}
            onChange={(event) => mainStore.setFilter(event.target.value)}
            placeholder="Filter"
          />
        </div>
        <TableContainer className={styles.tableContainer}>
          <Table className={styles.table} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Validator</TableCell>
                <TableCell>Skip</TableCell>
                <TableCell>MEV Rev. - Total</TableCell>
                <TableCell>MEV Rev - Kept</TableCell>
                <TableCell>Wallets</TableCell>
                <TableCell>Keep %</TableCell>
                <TableCell>No Chains</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mainStore.topMevValidators.map((info, idx) => (
                <TableRow key={info.name}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell style={{ color: '#6398FF', fontSize: '13px' }}>{info.name}</TableCell>
                  <TableCell>{info.skip}</TableCell>
                  <TableCell>${info.totalRevenue.toLocaleString('en-US')}</TableCell>
                  <TableCell style={{ borderRadius: '0 6px 6px 0' }}>
                    ${info.totalShared.toLocaleString('en-US')}
                  </TableCell>
                  <TableCell>{info.wallets.toLocaleString('en-US')}</TableCell>
                  <TableCell>{info.keep}</TableCell>
                  <TableCell>{info.chainsValidating}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className={styles.statContent}>
        <Typography className={styles.title}>Validator Stats</Typography>
        <PaymentStatLabel label="% Validaotrs Using Skip" value="87%" />
        <PaymentStatLabel label="Good MEV $ Saved" value="$1.5m" />
        <PaymentStatLabel label="Bad MEV $ Lost" value="$1.2m" />
      </div>
    </div>
  );
});
