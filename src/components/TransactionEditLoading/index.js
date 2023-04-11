import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function EditLoading() {
  return (
    <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton height='4vw' variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton style={{transform:'translate(40%)', marginTop:'50px'}} width='60vw' height='10vw'  variant="text" sx={{ fontSize: '3rem' }} />

      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton style={{ transform:'translate(60%)', marginTop:'100px'}} variant="rectangular" width='50vw' height='10vw' />
      <Skeleton style={{ transform:'translate(60%)'}} variant="rounded" width='50vw' height='10vw' />
    </Stack>
  );
}
