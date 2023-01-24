import { observer } from 'mobx-react-lite';
import cx from 'clsx';
import { MenuItem, Select as MuiSelect } from '@mui/material';
import { SelectOption } from '@/types';
import styles from './Select.module.css';

interface SelectProps {
  isDarkTheme?: boolean;
  value: string;
  options: SelectOption[];
  onChange: (value: any) => void;
}

export const Select = observer<SelectProps>(({ isDarkTheme = false, value, options, onChange }) => {
  return (
    <MuiSelect
      variant="standard"
      value={value}
      classes={{
        select: cx(styles.selectComponent, { [styles.darkSelect]: isDarkTheme }),
        icon: cx(styles.selectIcon, { [styles.darkIcon]: isDarkTheme }),
      }}
      MenuProps={{ classes: { paper: styles.paper } }}
      className={cx(styles.selectRoot, { [styles.darkRoot]: isDarkTheme })}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map(({ label, value }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </MuiSelect>
  );
});
