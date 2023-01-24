import { observer } from 'mobx-react-lite';
import { PaymentIcon } from '@/icons/PaymentIcon';

import styles from './PaymentStatLabel.module.css';

interface PaymentStatLabelProps {
  label: string;
  value: string | number | undefined;
}

export const PaymentStatLabel = observer<PaymentStatLabelProps>(({ label, value }) => {
  return (
    <div className={styles.statContainer}>
      <PaymentIcon />
      <span className={styles.label}>&nbsp;{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
});
