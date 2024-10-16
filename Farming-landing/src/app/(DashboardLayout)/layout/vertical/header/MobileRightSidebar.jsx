import React, { useState } from 'react';
import {
  IconApps,
  IconCalendarEvent,
  IconChevronDown,
  IconChevronUp,
  IconGridDots,
  IconMail,
  IconMessages,
} from '@tabler/icons-react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import Link from 'next/link';
import AppLinks from './AppLinks';
import QuickLinks from './QuickLinks';

const MobileRightSidebar = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const cartContent = (
    <Box>
      {/* ------------------------------------------- */}
      {/* Apps Content */}
      {/* ------------------------------------------- */}
      <Box px={1}>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton component={Link} href="/apps/chats">
            <ListItemIcon sx={{ minWidth: 35 }}>
              <IconMessages size="21" stroke="1.5" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="subtitle2" fontWeight={600}>
                Chats
              </Typography>
            </ListItemText>
          </ListItemButton>
          <ListItemButton component={Link} href="/apps/calendar">
            <ListItemIcon sx={{ minWidth: 35 }}>
              <IconCalendarEvent size="21" stroke="1.5" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="subtitle2" fontWeight={600}>
                Calendar
              </Typography>
            </ListItemText>
          </ListItemButton>
          <ListItemButton component={Link} href="/apps/email">
            <ListItemIcon sx={{ minWidth: 35 }}>
              <IconMail size="21" stroke="1.5" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="subtitle2" fontWeight={600}>
                Email
              </Typography>
            </ListItemText>
          </ListItemButton>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon sx={{ minWidth: 35 }}>
              <IconApps size="21" stroke="1.5" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="subtitle2" fontWeight={600}>
                Apps
              </Typography>
            </ListItemText>
            {open ? (
              <IconChevronDown size="21" stroke="1.5" />
            ) : (
              <IconChevronUp size="21" stroke="1.5" />
            )}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box px={4} pt={3} overflow="hidden">
              <AppLinks />
            </Box>
          </Collapse>
        </List>
      </Box>

      <Box px={3} mt={3}>
        <QuickLinks />
      </Box>
    </Box>
  );

  return (
    <Box>
      <IconButton
        size="large"
        color="inherit"
        onClick={() => setShowDrawer(true)}
        sx={{
          ...(showDrawer && {
            color: 'primary.main',
          }),
        }}
      >
        <IconGridDots size="21" stroke="1.5" />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Cart Sidebar */}
      {/* ------------------------------------------- */}
      <Drawer
        anchor="right"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        PaperProps={{ sx: { width: '300px' } }}
      >
        <Box p={3} pb={0}>
          <Typography variant="h5" fontWeight={600}>
            Navigation
          </Typography>
        </Box>

        {/* component */}
        {cartContent}
      </Drawer>
    </Box>
  );
};

export default MobileRightSidebar;
