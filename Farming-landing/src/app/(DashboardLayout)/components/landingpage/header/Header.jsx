import React, { useEffect, useState, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';
import Logo from '@/app/(DashboardLayout)/layout/shared/logo/Logo';
import Navigations from './Navigations';
import MobileSidebar from './MobileSidebar';
import { IconMenu2 } from '@tabler/icons-react';

const LpHeader = () => {
  const heroRef = useRef(null);

  const AppBarStyled = styled(AppBar)(({ theme, transparent }) => ({
    justifyContent: 'center',
    [theme.breakpoints.up('lg')]: {
      minHeight: '40px',
    },
    background: transparent ? 'rgba(255, 255, 255, 0.15)' : theme.palette.background.paper,
    boxShadow: transparent ? 'none' : '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    backdropFilter: 'blur(5.5px)',
    WebkitBackdropFilter: 'blur(5.5px)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    transition: 'box-shadow 0.3s ease, background 0.3s ease',
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
    color: theme.palette.text.secondary,
  }));

  const NavLink = styled('a')(({ theme }) => ({
    color: 'black',
    textDecoration: 'none',
    margin: '0 25px',
    padding: '0 15px',
    '&:hover': {
      color: '#199b08',
    },
  }));

  // Detect scroll position to remove shadow on hero section
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroHeight = heroRef.current.offsetHeight;
        if (window.scrollY >= heroHeight) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call on mount to set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBarStyled position="sticky" transparent={!isScrolled} elevation={isScrolled ? 8 : 0}>
      <Container maxWidth="lg">
        <ToolbarStyled>
          <Logo />
          <Box flexGrow={1} />
          {lgDown ? (
            <IconButton color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
              <IconMenu2 size="20" />
            </IconButton>
          ) : null}
          {lgUp ? (
            <Stack spacing={1} direction="row" alignItems="center">
              {/* Remove Market and Weather sections */}
              <NavLink href="#home">Home</NavLink>
              <NavLink href="#about">About</NavLink>
              <NavLink href="#services">Services</NavLink>
              <NavLink href="#contact">Contact</NavLink>
              <NavLink href="#contact">Login</NavLink>
              <NavLink href="#contact">Sign Up</NavLink>
            </Stack>
          ) : null}
        </ToolbarStyled>
      </Container>
      <Drawer
        anchor="left"
        open={open}
        variant="temporary"
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 270,
            border: '0 !important',
            boxShadow: (theme) => theme.shadows[8],
          },
        }}
      >
        <MobileSidebar />
      </Drawer>
    </AppBarStyled>
  );
};

export default LpHeader;
