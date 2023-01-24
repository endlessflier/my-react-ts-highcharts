import { observer } from 'mobx-react-lite';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import cx from 'clsx';
import { TextField } from '../TextField';

import styles from './SearchField.module.css';

interface SearchFieldProps {
  isDarkTheme: boolean;
  variant: string;
  placeholder: string;
  value: string;
  onChange: (event: any) => void;
}

export const SearchField = observer<SearchFieldProps>(
  ({ isDarkTheme, variant, placeholder, value, onChange, ...rest }) => {
    return (
      <TextField
        {...rest}
        variant="search"
        isDarkTheme={isDarkTheme}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        classes={{
          root: cx(
            styles.searchField,
            variant === 'search' ? styles.searchWidth : styles.filterWidth,
          ),
        }}
        startAdornment={
          <InputAdornment
            position="start"
            classes={{
              root: styles.searchField,
            }}
          >
            <SearchIcon />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment
            position="end"
            classes={{
              root: styles.searchField,
            }}
          >
            {variant === 'search' ? (
              <>
                <div className={styles.button}>⌘</div>
                <div className={styles.button}>k</div>
              </>
            ) : (
              value && (
                <CancelIcon
                  onClick={() => onChange({ target: { value: '' } })}
                  data-testid="SearchField_CancelButton"
                />
              )
            )}
          </InputAdornment>
        }
      />
    );
  },
);
