import React, { useState } from 'react';
import { Button, Box, Drawer, useMediaQuery, Paper } from '@mui/material';

const drawerWidth = 240;
const secdrawerWidth = 320;

const ThreeColumn = ({ leftChild, middleChild, rightChild }) => {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return (
    <Paper sx={{ display: 'flex', p: 0 }} variant="outlined">
      {/* ------------------------------------------- */}
      {/* Left Part */}
      {/* ------------------------------------------- */}

      <Drawer
        open={isLeftSidebarOpen}
        onClose={() => setLeftSidebarOpen(false)}
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, position: 'relative' },
          flexShrink: 0,
        }}
        variant={lgUp ? 'permanent' : 'temporary'}
      >
        {leftChild}
      </Drawer>
      {/* ------------------------------------------- */}
      {/* Middle part */}
      {/* ------------------------------------------- */}
      <Box
        sx={{
          minWidth: secdrawerWidth,
          width: { xs: '100%', md: secdrawerWidth, lg: secdrawerWidth },
          flexShrink: 0,
        }}
      >
        {middleChild}
      </Box>
      {/* ------------------------------------------- */}
      {/* Right part */}
      {/* ------------------------------------------- */}
      <Drawer
        anchor="right"
        open={isRightSidebarOpen}
        onClose={() => setRightSidebarOpen(false)}
        sx={{
          flexShrink: 0,
          width: drawerWidth,
          flex: mdUp ? 'auto' : '',
          [`& .MuiDrawer-paper`]: { width: '100%', position: 'relative' },
        }}
        variant={mdUp ? 'permanent' : 'temporary'}
      >
        {/* back btn Part */}
        {mdUp ? (
          ''
        ) : (
          <Box sx={{ p: 3 }}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => setRightSidebarOpen(false)}
              sx={{ mb: 3, display: { xs: 'block', md: 'none', lg: 'none' } }}
            >
              Back{' '}
            </Button>
          </Box>
        )}
        {rightChild}
      </Drawer>
    </Paper>
  );
};

export default ThreeColumn;
