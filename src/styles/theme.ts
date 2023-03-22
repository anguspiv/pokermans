import type {} from '@mui/lab/themeAugmentation';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { teal } from '@mui/material/colors';

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: teal[500],
      },
    },
  }),
);

export default theme;
