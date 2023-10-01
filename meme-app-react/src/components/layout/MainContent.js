import styled from 'styled-components';

const MainContent = styled.section`
    display: flex;
    margin-bottom: 3rem;

    @media all and (max-width: ${({ theme }) => theme.layout.smWidth}) {
        flex-direction: column;
    }
`;

export default MainContent;
