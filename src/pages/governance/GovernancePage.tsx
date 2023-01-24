import { observer } from 'mobx-react-lite';
import styles from './GovernancePage.module.css';

export const GovernancePage = observer(() => {
  return (
    <div className={styles.content}>
      <div className={styles.container}>Governance</div>
    </div>
  );
});
