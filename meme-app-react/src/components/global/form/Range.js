import styled from 'styled-components';

const Range = styled.input.attrs({
    type: 'range',
})`
    appearance: none; /*removes default webkit styles*/
    width: 100%;
    background: transparent;
    cursor: pointer;
    &:disabled {
        cursor: not-allowed;
    }

    /* Thumb */
    &::-webkit-slider-thumb {
        /*Chrome, Opera, Safari*/
        appearance: none;
        border: none;
        height: 12px;
        width: 12px;
        border-radius: 50%;
        background: ${({ theme }) => theme.colors.quaternary};
        margin-top: -5px;
    }
    &::-moz-range-thumb {
        /* Firefox */
        appearance: none;
        border: none;
        height: 12px;
        width: 12px;
        border-radius: 50%;
        background: ${({ theme }) => theme.colors.quaternary};
        margin-top: -5px;
    }
    /* Track */
    &::-webkit-slider-runnable-track {
        /*Chrome, Opera, Safari*/
        width: 100%;
        height: 2px;
        background: ${({ theme }) => theme.colors.white};
        border: none;
        border-radius: 3px;
    }
    &::-moz-range-track {
        /* Firefox */
        width: 100%;
        height: 2px;
        background: ${({ theme }) => theme.colors.white};
        border: none;
        border-radius: 3px;
    }
    /* Focus */
    &:focus {
        outline: none;
    }
    &:focus::-webkit-slider-thumb {
        background: ${({ theme }) => theme.colors.tertiary};
    }
    &:focus::-moz-range-thumb {
        background: ${({ theme }) => theme.colors.tertiary};
    }
`;

export default Range;
