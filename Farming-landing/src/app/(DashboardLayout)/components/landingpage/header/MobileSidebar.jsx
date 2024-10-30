import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import Logo from '@/app/(DashboardLayout)/layout/shared/logo/Logo';

const MobileSidebar = () => {
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);

  return (
    <>
      <Box px={3}>
        <Logo />
      </Box>
      <Box p={3}>
        <Stack direction="column" spacing={2}>
          {toggle && (
            <Collapse in={toggle}>
              <Box m="-21px">
                <Box ml={1}></Box>
              </Box>
            </Collapse>
          )}

          <Button
            color="inherit"
            href="https://customer.krushimitra.com"
            sx={{
              justifyContent: 'start',
            }}
          >
            Customer
          </Button>
          <Button
            color="inherit"
            href="https://serviceprovider.krushimitra.com"
            sx={{
              justifyContent: 'start',
            }}
          >
            ServiceProvider
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default MobileSidebar;
