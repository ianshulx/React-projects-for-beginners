import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';

// third party
import { motion } from 'framer-motion';

const StyledButton = styled(Button)(({ theme }) => ({
  padding: '13px 48px',
  fontSize: '16px',
  color: '#DF4511',
  '&:hover': {
    backgroundColor: '#DF4511',
    color: 'white',
  },
}));

const BannerContent = () => {
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <Box mt={lgDown ? 8 : 0}>
      <motion.div
        initial={{ opacity: 0, translateY: 550 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 30,
        }}
      >
        <img src="/images/landingpage/KaryMitra.png" alt="" />

        <Typography
          variant="h1"
          fontWeight={900}
          sx={{
            fontSize: {
              md: '54px',
            },
            lineHeight: {
              md: '60px',
            },
          }}
        >
          Get a quick reach to Service Providers with us
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, translateY: 550 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 30,
          delay: 0.4,
        }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={3}>
          <StyledButton
            style={{ borderColor: '#DF4511' }}
            variant="outlined"
            href="https://serviceprovider.krushimitra.com/auth/login"
          >
            Login{' '}
          </StyledButton>
        </Stack>
      </motion.div>
    </Box>
  );
};

export default BannerContent;
