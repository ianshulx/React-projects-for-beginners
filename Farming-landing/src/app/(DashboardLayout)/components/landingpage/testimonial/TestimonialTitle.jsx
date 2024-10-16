import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AnimationFadeIn from '../animation/Animation';

const TestimonialTitle = () => {
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={10} lg={8}>
        <AnimationFadeIn>
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
            Don’t just take our words for it, See what developers like you are saying
          </Typography>
        </AnimationFadeIn>
      </Grid>
    </Grid>
  );
};

export default TestimonialTitle;
