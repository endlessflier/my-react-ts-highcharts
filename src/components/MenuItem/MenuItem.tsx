import { ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import cx from 'clsx';
import styles from './MenuItem.module.css';

interface MenuItemProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export const MenuItem = observer<MenuItemProps>(({ children, active = false, onClick }) => {
  return (
    <div className={cx(styles.menuItem, { [styles.active]: active })} onClick={onClick}>
      {children}
    </div>
  );
});
