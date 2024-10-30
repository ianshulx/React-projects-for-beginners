import styled from 'styled-components';

const ImageWrapper = styled.div`
    position: relative;
    width: 50%;
    padding-right: 4rem;
    transition: height 0.4s;

    @media all and (max-width: ${({ theme }) => theme.layout.mdWidth}) {
        padding-right: 1rem;
    }

    @media all and (max-width: ${({ theme }) => theme.layout.smWidth}) {
        width: 100%;
        margin-bottom: 2rem;
        padding-right: 0;
    }
`;
export default ImageWrapper;
