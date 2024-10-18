'use client';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components


export default function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={3}>
        <Grid container spacing={3}>
          {/* column */}
          <Grid item xs={12} lg={12}>
            <TopCards />
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={8}>
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={12}>
              </Grid>
              <Grid item xs={12} sm={6} lg={12}>
              </Grid>
            </Grid>
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={4}>
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
              </Grid>
              <Grid item xs={12} sm={6}>
              </Grid>
              <Grid item xs={12}>
                <Social />
              </Grid>
            </Grid>
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={4}>
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={4}>
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={8}>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
