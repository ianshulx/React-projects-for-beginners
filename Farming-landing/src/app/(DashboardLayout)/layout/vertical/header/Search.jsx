import { useState } from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { IconSearch, IconX } from '@tabler/icons-react';
import Menuitems from '../sidebar/MenuItems';
import Link from 'next/link';


const Search = () => {
  // drawer top
  const [showDrawer2, setShowDrawer2] = useState(false);
  const [search, setSerach] = useState('');

  const handleDrawerClose2 = () => {
    setShowDrawer2(false);
  };

  const filterRoutes = (rotr, cSearch) => {
    if (rotr.length > 1)
      return rotr.filter((t) =>
        t.title ? t.href.toLocaleLowerCase().includes(cSearch.toLocaleLowerCase()) : '',
      );

    return rotr;
  };
  const searchData = filterRoutes(Menuitems, search);

  return (
    <>
      <IconButton
        aria-label="show 4 new mails"
        color="inherit"
        aria-controls="search-menu"
        aria-haspopup="true"
        onClick={() => setShowDrawer2(true)}
        size="large"
      >
        <IconSearch size="16" />
      </IconButton>
      <Dialog
        open={showDrawer2}
        onClose={() => setShowDrawer2(false)}
        fullWidth
        maxWidth={'sm'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ sx: { position: 'fixed', top: 30, m: 0 } }}
      >
        <DialogContent className="testdialog">
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              id="tb-search"
              placeholder="Search here"
              fullWidth
              onChange={(e) => setSerach(e.target.value)}
              inputProps={{ 'aria-label': 'Search here' }}
            />
            <IconButton size="small" onClick={handleDrawerClose2}>
              <IconX size="18" />
            </IconButton>
          </Stack>
        </DialogContent>
        <Divider />
        <Box p={2} sx={{ maxHeight: '60vh', overflow: 'auto' }}>
          <Typography variant="h5" p={1}>
            Quick Page Links
          </Typography>
          <Box>
            <List component="nav">
              {searchData.map((menu) => {
                return (
                  <Box key={menu.title ? menu.id : menu.subheader}>
                    {menu.title && !menu.children ? (
                      <ListItemButton sx={{ py: 0.5, px: 1 }} href={menu?.href} component={Link}>
                        <ListItemText
                          primary={menu.title}
                          secondary={menu?.href}
                          sx={{ my: 0, py: 0.5 }}
                        />
                      </ListItemButton>
                    ) : (
                      ''
                    )}
                    {menu.children ? (
                      <>
                        {menu.children.map((child) => {
                          return (
                            <ListItemButton
                              sx={{ py: 0.5, px: 1 }}
                              href={child.href}
                              component={Link}
                              key={child.title ? child.id : menu.subheader}
                            >
                              <ListItemText
                                primary={child.title}
                                secondary={child.href}
                                sx={{ my: 0, py: 0.5 }}
                              />
                            </ListItemButton>
                          );
                        })}
                      </>
                    ) : (
                      ''
                    )}
                  </Box>
                );
              })}
            </List>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default Search;
