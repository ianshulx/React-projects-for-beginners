import styled from 'styled-components';

const AppWrapper = styled.div`
    margin: 3rem 0;

    @media all and (max-width: ${({ theme }) => theme.layout.smWidth}) {
        margin: 1rem 0;
    }
`;

export default AppWrapper;
