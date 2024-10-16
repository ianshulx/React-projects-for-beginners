import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

const StyledButton = styled(Button)(({ theme }) => ({
  padding: '13px 34px',
  fontSize: '16px',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.main,
  fontWeight: 600,
}));

const StyledButton2 = styled(Button)(({ theme }) => ({
  padding: '13px 34px',
  fontSize: '16px',
  borderColor: theme.palette.background.paper,
  color: theme.palette.background.paper,
  fontWeight: 600,
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
  },
}));

const C2a2 = () => {
  return (
    <Box>
      <Box
        bgcolor="primary.main"
        sx={{
          pt: '60px',
          pb: '30px',
        }}
      >
        <Container maxWidth="lg">
          <Grid container justifyContent="space-between" spacing={3}>
            <Grid item xs={12} sm={12} lg={5}>
              <Typography variant="h2" color="background.paper" fontWeight={700} mt={4}>
                Build your app with our highly customizable NextJs based Dashboard
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} mt={3}>
                <StyledButton variant="contained" color="inherit" href="/auth/auth1/login">
                  Login
                </StyledButton>
                <StyledButton2 variant="outlined" color="inherit" href="/auth/auth1/register">
                  Register
                </StyledButton2>
              </Stack>
            </Grid>
            <Grid item xs={12} lg={5}>
              <Box
                sx={{
                  textAlign: {
                    xs: 'center',
                    lg: 'right',
                  },
                }}
              >
                <Image src="/images/landingpage/background/c2a.png" alt="img" width="330" height={330} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default C2a2;
