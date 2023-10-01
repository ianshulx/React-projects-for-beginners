import styled, { css } from 'styled-components';

const WrapInput = styled.div`
    margin-bottom: 1rem;
    ${props =>
        props.flex &&
        css`
            display: flex;
            & > div {
                margin-right: 1rem;
                transition: opacity 0.4s;
                &:last-child {
                    margin-right: 0;
                }
                &.inactive {
                    opacity: 0.25;
                }
            }
        `}
`;

export default WrapInput;
