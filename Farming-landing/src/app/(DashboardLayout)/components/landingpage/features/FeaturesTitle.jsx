import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const FeaturesTitle = () => {
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={10} lg={6}>
        <Typography
          fontSize="16"
          textTransform="uppercase"
          color="primary.main"
          fontWeight={500}
          textAlign="center"
          mb={1}
        >
          ALMOST COVERED EVERYTHING
        </Typography>
        <Typography
          variant="h2"
          fontWeight={700}
          textAlign="center"
          sx={{
            fontSize: {
              lg: '36px',
              xs: '25px',
            },
            lineHeight: {
              lg: '43px',
              xs: '30px',
            },
          }}
        >
          Other Amazing Features & Flexibility Provided
        </Typography>
      </Grid>
    </Grid>
  );
};

export default FeaturesTitle;
