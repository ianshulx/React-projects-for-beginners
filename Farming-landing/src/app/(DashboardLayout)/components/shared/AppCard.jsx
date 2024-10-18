import { Card } from '@mui/material';
import { useSelector } from 'react-redux';

const AppCard = ({ children }) => {
  const customizer = useSelector((state) => state.customizer);

  return (
    <Card
      sx={{ display: 'flex', p: 0 }}
      elevation={customizer.isCardShadow ? 9 : 0}
      variant={!customizer.isCardShadow ? 'outlined' : undefined}
    >
      {children}
    </Card>
  );
};

export default AppCard;
