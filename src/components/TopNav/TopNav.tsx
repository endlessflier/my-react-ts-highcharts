import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';

import { BASE_ROUTES } from '@/config';
import { Select } from '../Select';
import styles from './TopNav.module.css';

type LogInfo = 'Sign Up' | 'Log In' | 'Log out';
const LogOptions: { value: LogInfo; label: LogInfo }[] = [
  { value: 'Sign Up', label: 'Sign Up' },
  { value: 'Log In', label: 'Log In' },
  { value: 'Log out', label: 'Log out' },
];

type Wallet = 'Connect Wallet';
const WalletOptions: { value: Wallet; label: Wallet }[] = [
  { value: 'Connect Wallet', label: 'Connect Wallet' },
];

export const TopNav = observer(() => {
  const [logValue, setLogValue] = useState<LogInfo>('Sign Up');
  const [wallet, setWallet] = useState<Wallet>('Connect Wallet');

  return (
    <aside className={styles.topContainer}>
      <span className={styles.title}>Skip/Select</span>
      <div className={styles.menuContainer}>
        <div className={styles.menuBlock}>
          <NavLink className={styles.link} to={BASE_ROUTES.main}>
            Home
          </NavLink>
          <NavLink className={styles.link} to={BASE_ROUTES.governance}>
            Governance
          </NavLink>
          <NavLink className={styles.link} to={BASE_ROUTES.github}>
            Github
          </NavLink>
        </div>
        <div className={styles.buttonBlock}>
          <Select value={logValue} options={LogOptions} onChange={(v) => setLogValue(v)} />
          <Select
            isDarkTheme
            value={wallet}
            options={WalletOptions}
            onChange={(v) => setWallet(v)}
          />
        </div>
      </div>
    </aside>
  );
});
