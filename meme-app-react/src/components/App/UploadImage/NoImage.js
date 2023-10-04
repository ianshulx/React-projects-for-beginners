import styled from 'styled-components';

const NoImage = styled.div`
    width: 100%;
    padding: 1rem;
    text-align: center;
    font-weight: ${({ theme }) => theme.typography.bold};
    font-size: 2em;
    color: ${({ theme }) => theme.colors.white};

    @media all and (max-width: ${({ theme }) => theme.layout.xsWidth}) {
        font-size: 1.5em;
    }
`;

export default NoImage;
