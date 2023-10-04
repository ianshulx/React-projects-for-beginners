import styled from 'styled-components';

const Container = styled.div`
    max-width: ${({ theme }) => theme.layout.maxWidth};
    margin: 0 auto;
    padding: 0 1rem;
`;

export default Container;
