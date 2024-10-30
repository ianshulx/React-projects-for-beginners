import styled from 'styled-components';
import { shake } from '../../../config/animations';

const ErrorText = styled.p`
    margin-top: 0.25rem;
    font-style: italic;
    font-size: 0.875em;
    color: ${({ theme }) => theme.colors.error};
    animation: ${shake} 2.5s infinite;
`;

export default ErrorText;
