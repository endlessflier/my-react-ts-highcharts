import { observer } from 'mobx-react-lite';
import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import cx from 'clsx';

import styles from './TextField.module.css';

interface TextFieldProps {
  variant: string;
  value: string;
  isDarkTheme: boolean;
  placeholder: string;
  startAdornment: any;
  endAdornment: any;
  classes: any;
  onChange: (event: any) => void;
}

export const TextField = observer<TextFieldProps>(
  ({ variant, isDarkTheme, placeholder, startAdornment, endAdornment, classes, ...rest }) => {
    return (
      <FormControl {...rest} variant="standard">
        <Input
          {...rest}
          aria-describedby="component-textfield-text"
          placeholder={placeholder}
          startAdornment={startAdornment}
          endAdornment={endAdornment}
          classes={{
            root: cx(
              styles.textFieldInput,
              {
                [styles.textFieldInputSearch]: variant === 'search',
                [styles.textFieldDark]: isDarkTheme,
                [styles.textFieldInputHiddenLabel]: variant === 'search',
              },
              classes?.root,
            ),
            input: styles.textFieldBaseInput,
            focused: styles.textFieldInputFocus,
            error: styles.textFieldError,
            disabled: styles.textFieldDisabled,
            multiline: styles.multiline,
          }}
        />
      </FormControl>
    );
  },
);
