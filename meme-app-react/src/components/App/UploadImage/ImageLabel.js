import styled from 'styled-components';

const ImageLabel = styled.label.attrs({
    htmlFor: 'up-img',
})`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    min-height: ${({ active }) => (active ? '0px' : '450px')};
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 5px;
    cursor: pointer;

    @media all and (max-width: ${({ theme }) => theme.layout.xsWidth}) {
        min-height: ${({ active }) => (active ? '0px' : '300px')};
    }
`;

export default ImageLabel;
