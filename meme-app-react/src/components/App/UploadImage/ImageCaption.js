import React, { useContext } from 'react';
import { MemeContext } from '../../../context/MemeContext';
import styled from 'styled-components';
import { formatSizeUnits } from '../../../utils';

const Caption = styled.div`
    margin-bottom: 1rem;
    p {
        font-size: 0.875em;
        b {
            font-weight: ${({ theme }) => theme.typography.normal};
            color: ${({ theme }) => theme.colors.quaternary};
        }
    }
`;

const ImageCaption = () => {
    // Global state
    // state to read and dispatch to modify
    const meme = useContext(MemeContext);

    return (
        <Caption>
            <p>
                <b>Image name:</b> {meme.state.imageSelected.name}
            </p>
            <p>
                <b>Image size:</b>{' '}
                {formatSizeUnits(meme.state.imageSelected.size)}
            </p>
        </Caption>
    );
};

export default ImageCaption;
