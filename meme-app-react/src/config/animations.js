import { keyframes } from 'styled-components';

/**
 * Move element rapidly left and right
 */
const offset = 6;
const shake = keyframes`
0% {
    transform: translateX(0);
}
2% {
    transform: translateX(0);
}
4% {
    transform: translateX(-${offset}px);
}
6% {
    transform: translateX(0px);
}
8% {
    transform: translateX(${offset}px);
}
10% {
    transform: translateX(0);
}
12% {
    transform: translateX(-${offset}px);
}
14% {
    transform: translateX(0);
}
16% {
    transform: translateX(${offset}px);
}
18% {
    transform: translateX(0);
}
`;

export { shake };
