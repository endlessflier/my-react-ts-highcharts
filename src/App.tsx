import { Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { TopNav } from '@/components';
import { MainPage, GovernancePage, GithubPage } from '@/pages';
import { BASE_ROUTES } from '@/config';
import styles from './App.module.css';

const App = observer(() => {
  return (
    <div className={styles.container}>
      <TopNav />
      <Routes>
        <Route path={BASE_ROUTES.main} element={<MainPage />} />
        <Route path={BASE_ROUTES.governance} element={<GovernancePage />} />
        <Route path={BASE_ROUTES.github} element={<GithubPage />} />
      </Routes>
    </div>
  );
});

export default App;
