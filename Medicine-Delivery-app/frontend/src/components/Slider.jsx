import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';
const Container = styled.div`
    height:50vh;
    overflow:hidden;
`;

const Slider = () => {
  return (
    <Container>
        <Carousel autoPlay={true} infiniteLoop={true} showArrows={true} showThumbs={false} >
                <div>
                    <img src="https://mercury.akamaized.net/i/05a03a5aa778de33a13303b6d43a8741_207080_0.jpg" alt='' style={{height:"50vh"}}/>
                </div>
                <div>
                    <img src="https://mercury.akamaized.net/i/438a6543f1dbf1d55fa5438637402841_201575_0.jpg" alt='' style={{height:"50vh"}}/>
                </div>
                <div>
                    <img src="https://mercury.akamaized.net/i/7174f1ba83d50b2848964a148b7a260c_201158_0.jpg " alt='' style={{height:"50vh"}}/>
                </div>
            </Carousel>
    </Container>      
  )
}

export default Slider;
