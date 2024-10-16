import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import FrameworksTitle from './FrameworksTitle';
import Image from 'next/image';

import SliderImg from "../../../../../../public/images/landingpage/background/slider-group.png";

const SliderBox = styled(Box)(() => ({
  '@keyframes slide': {
    '0%': {
      transform: 'translate3d(0, 0, 0)',
    },
    '100% ': {
      transform: 'translate3d(-100%, 0, 0)',
    },
  },
  animation: 'slide 45s linear infinite',
}));

const Frameworks = () => {
  return (
    <Box
      bgcolor="action.hover"
      sx={{
        py: {
          xs: '70px',
          lg: '120px',
        },
      }}
    >
      <Container maxWidth="lg">
        {/* Title */}
        <FrameworksTitle />
      </Container>
      <Stack overflow="hidden" mt={6} direction={'row'}>
        <Box>
          <SliderBox>
            <Image
              src={SliderImg}
              alt="slide"
              style={{ height: '100%' }}
            />
          </SliderBox>
        </Box>
        <Box>
          <SliderBox>
            <Image
              src={SliderImg}
              alt="slide"
              style={{ height: '100%' }}
            />
          </SliderBox>
        </Box>
      </Stack>
    </Box>
  );
};

export default Frameworks;
