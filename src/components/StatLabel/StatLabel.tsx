import { observer } from 'mobx-react-lite';

import styles from './StatLabel.module.css';

interface StatLabelProps {
  label: string;
  value: string | number | undefined;
}

export const StatLabel = observer<StatLabelProps>(({ label, value }) => {
  return (
    <div className={styles.statContainer}>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>&nbsp;{label}</span>
    </div>
  );
});
