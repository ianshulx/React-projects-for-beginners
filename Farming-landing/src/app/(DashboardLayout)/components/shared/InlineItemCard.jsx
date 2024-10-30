import { Box } from '@mui/material';

const InlineItemCard = ({ children }) => (
  <Box
    sx={{
      display: {
        xs: 'flex',
        sm: 'inline-block',
      },
      flexDirection: {
        xs: 'column',
        sm: 'unset',
      },
      '.MuiChip-root, .MuiButton-root': {
        m: '5px',
      },
    }}
  >
    {children}
  </Box>
);

export default InlineItemCard;
