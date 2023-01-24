import { observer } from 'mobx-react-lite';
import { MenuItem, Select } from '@mui/material';
import { SelectOption } from '@/types';
import styles from './SortbyLabel.module.css';

interface SortbyLabelProps {
  label: string;
  value: string;
  options: SelectOption[];
  sortbyHidden?: boolean;
  onChange: (value: any) => void;
}

export const SortbyLabel = observer<SortbyLabelProps>(
  ({ label, value, options, sortbyHidden = false, onChange }) => {
    return (
      <div className={styles.sortbyContainer}>
        <span className={styles.label}>{label}</span>
        <div className={styles.menuContainer}>
          {!sortbyHidden && <span className={styles.sortBy}>Sort by</span>}
          <Select
            variant="standard"
            value={value}
            classes={{ select: styles.selectComponent, icon: styles.selectIcon }}
            className={styles.selectRoot}
            onChange={(e) => onChange(e.target.value)}
          >
            {options.map(({ label, value }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
    );
  },
);
