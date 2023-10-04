import styled from 'styled-components';

const TextWrapper = styled.section`
    width: 50%;
    opacity: 0.5;
    transition: opacity 0.4s;
    &.active {
        opacity: 1;
    }

    @media all and (max-width: ${({ theme }) => theme.layout.smWidth}) {
        width: 100%;
    }
`;

export default TextWrapper;
