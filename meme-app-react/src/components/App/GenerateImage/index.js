import React, { useState, useContext } from 'react';
import { MemeContext } from '../../../context/MemeContext';
import htmlToImage from 'html-to-image';
import Button from '../../global/Button';
import Wrapper from './Wrapper';
import Meme from './Meme';

export const GenerateImage = () => {
    // Global state
    // state to read and dispatch to modify
    const meme = useContext(MemeContext);

    // Local state
    const [image, setImage] = useState(null);

    // Methods
    const generateMeme = () => {
        htmlToImage
            .toPng(document.getElementById('active-image'))
            .then(function (dataUrl) {
                var img = new Image();
                img.src = dataUrl;
                img.crossOrigin = 'anonymous';
                setImage(img.src);
            })
            .catch(function (error) {
                console.error('We have a problem:', error);
            });
    };

    const resetMeme = () => {
        meme.dispatch({ type: 'RESET_MEME' });
    };

    const closeMeme = () => {
        setImage(null);
    };

    // Render
    let memeImage;
    if (image) {
        memeImage = <Meme path={image} close={closeMeme} />;
    }
    return (
        <Wrapper>
            <Button
                primary
                margin="0 1rem 1rem 0"
                handleClick={generateMeme}
                isDisabled={!meme.state.imageSelected}
            >
                Generate a new MEME
            </Button>
            <Button
                margin="0 1rem 1rem 0"
                handleClick={resetMeme}
                isDisabled={!meme.state.imageSelected}
            >
                Reset MEME settings
            </Button>
            {memeImage}
        </Wrapper>
    );
};

export default GenerateImage;
