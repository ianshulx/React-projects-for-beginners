import React, { useState } from 'react';
import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';

const Navigations = () => {
  const StyledButton = styled(Button)(({ theme }) => ({
    fontSize: '16px',
    color: theme.palette.text.secondary,
  }));

  // demos
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // pages

  const [open2, setOpen2] = useState(false);

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  return (
    <>
      <StyledButton color="inherit" variant="text" href="http://customer.krushimitra.com/">
        Customer
      </StyledButton>
      <StyledButton color="inherit" variant="text" href="https://serviceprovider.krushimitra.com/">
        ServiceProvider
      </StyledButton>
    </>
  );
};

export default Navigations;
