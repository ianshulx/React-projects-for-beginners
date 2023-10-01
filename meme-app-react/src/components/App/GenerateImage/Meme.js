import React from 'react';
import styled from 'styled-components';
import Title from '../../global/Title';

const Wrapper = styled.section`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
`;

const InnerContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 2rem 1rem 0;
    overflow-y: auto;
    text-align: center;
`;

const MemeTitle = styled(Title)`
    color: ${({ theme }) => theme.colors.white};
`;

const Image = styled.img`
    display: inline-block;
    width: 800px;
    max-width: 100%;
    margin-bottom: 2rem;
`;

const Close = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: ${({ theme }) => theme.colors.quaternary};
    cursor: pointer;
`;

export const Meme = ({ path, close }) => {
    return (
        <Wrapper onClick={close}>
            <InnerContainer>
                <MemeTitle as="h4" fsize="1.5" margin="0 0 2rem">
                    Click the image to download
                </MemeTitle>
                <a href={path} download="my-awesome-meme.png">
                    <Image src={path} alt="Generated Meme" />
                </a>
            </InnerContainer>
            <Close>Close</Close>
        </Wrapper>
    );
};

export default Meme;
