import { observer } from 'mobx-react-lite';
import styles from './GithubPage.module.css';

export const GithubPage = observer(() => {
  return (
    <div className={styles.content}>
      <div className={styles.container}>Github</div>
    </div>
  );
});
