import styled from 'styled-components';

const ImageInput = styled.input.attrs({
    id: 'up-img',
    type: 'file',
    accept: 'image/*',
})`
    position: absolute;
    top: 0;
    left: 0;
    z-index: -100;
    opacity: 0;
`;

export default ImageInput;
