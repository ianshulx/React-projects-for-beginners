import { Card, CardHeader, CardContent, Divider } from '@mui/material';
import { useSelector } from 'react-redux';

const BaseCard = ({ title, children }) => {
  const customizer = useSelector((state) => state.customizer);

  return (
    <Card
      sx={{ padding: 0 }}
      elevation={customizer.isCardShadow ? 9 : 0}
      variant={!customizer.isCardShadow ? 'outlined' : undefined}
    >
      <CardHeader title={title} />
      <Divider />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default BaseCard;
