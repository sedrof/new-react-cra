import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#2ca58d',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },

});
export default function LinearIndeterminate() {
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ width: '100%', color: theme.palette.primary.main}}>
      <LinearProgress />
    </Box>
    </ThemeProvider>
  );
}