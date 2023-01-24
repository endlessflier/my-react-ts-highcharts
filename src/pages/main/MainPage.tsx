import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import cx from 'clsx';
import { MenuItem, SearchField } from '@/components';
import { useMainStore } from './stores/useMainStore';
import { MainView } from './constants';
import { Chains, Overview, Validators } from './components';
import styles from './MainPage.module.css';

export const MainPage = observer(() => {
  const [activedView, setActivedView] = useState(MainView.overview);
  const mainStore = useMainStore();

  return (
    <div className={styles.content}>
      <div className={styles.menuBar}>
        <div className={styles.menuBlock}>
          <MenuItem
            active={activedView === MainView.overview}
            onClick={() => setActivedView(MainView.overview)}
          >
            Overview
          </MenuItem>
          <MenuItem
            active={activedView === MainView.validators}
            onClick={() => setActivedView(MainView.validators)}
          >
            Validators
          </MenuItem>
          <MenuItem
            active={activedView === MainView.chains}
            onClick={() => setActivedView(MainView.chains)}
          >
            Chains
          </MenuItem>
        </div>
        {activedView === MainView.validators && (
          <SearchField
            isDarkTheme
            variant="search"
            value={mainStore.search}
            onChange={(event) => mainStore.setSearch(event.target.value)}
            placeholder="Search..."
          />
        )}
      </div>
      <div
        className={cx(styles.container, {
          [styles.secondaryPage]: activedView !== MainView.overview,
        })}
      >
        {activedView === MainView.overview && <Overview />}
        {activedView === MainView.validators && <Validators />}
        {activedView === MainView.chains && <Chains />}
      </div>
    </div>
  );
});
