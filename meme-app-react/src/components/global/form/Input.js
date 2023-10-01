import styled from 'styled-components';

/**
 * Input component
 * @param {string} intype - the type to assign at the input HTML element
 */
const Input = styled.input.attrs(props => ({
    type: props.intype,
}))`
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0 1rem;
    background-color: rgba(255, 255, 255, 0.65);
    border: none;
    border-radius: 4px;
    outline: none;
    transition: background 0.4s;
    &:disabled {
        cursor: not-allowed;
    }
    &:focus {
        background-color: rgba(255, 255, 255, 1);
    }
`;

export default Input;
