import { useTheme } from '@mui/material/styles';
import { Card, CardContent, Typography, Box, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { IconGridDots } from '@tabler/icons-react';

const DashboardWidgetCard = ({
  title,
  subtitle,
  children,
  dataLabel1,
  dataItem1,
  dataLabel2,
  dataItem2,
}) => {
  const customizer = useSelector((state) => state.customizer);

  const theme = useTheme();
  const borderColor = theme.palette.grey[100];

  return (
    <Card
      sx={{ padding: 0, border: !customizer.isCardShadow ? `1px solid ${borderColor}` : 'none' }}
      elevation={customizer.isCardShadow ? 9 : 0}
      variant={!customizer.isCardShadow ? 'outlined' : undefined}
    >
      <CardContent sx={{ p: '30px' }}>
        {title ? (
          <Box>
            {title ? <Typography variant="h5">{title}</Typography> : ''}

            {subtitle ? (
              <Typography variant="subtitle2" color="textSecondary">
                {subtitle}
              </Typography>
            ) : (
              ''
            )}
          </Box>
        ) : null}

        {children}

        <Stack direction="row" spacing={2} justifyContent="space-between" mt={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              width={38}
              height={38}
              bgcolor="primary.light"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                color="primary.main"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <IconGridDots width={22} />
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                {dataLabel1}
              </Typography>
              <Typography variant="h6" fontWeight="600">
                {dataItem1}
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              width={38}
              height={38}
              bgcolor="grey.200"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                color="grey.400"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <IconGridDots width={22} />
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                {dataLabel2}
              </Typography>
              <Typography variant="h6" fontWeight="600">
                {dataItem2}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DashboardWidgetCard;
