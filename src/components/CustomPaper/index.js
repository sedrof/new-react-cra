import React from 'react';
import { Paper } from '@mui/material';

const CustomPaper = ({ children, ...props }) => {
  const mergedSx = {
    borderRadius: 3,
    backgroundColor: '#e8f5e9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    ...props.sx, // Merge the provided sx props
  };

  return (
    <Paper  sx={mergedSx}>
      {children}
    </Paper>
  );
};

export default CustomPaper;
