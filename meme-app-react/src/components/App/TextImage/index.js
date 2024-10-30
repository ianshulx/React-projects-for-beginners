import React, { useContext } from 'react';
import { MemeContext } from '../../../context/MemeContext';
import TextWrapper from './TextWrapper';
import TextLegenda from './TextLegenda';
import Title from '../../global/Title';
import WrapInput from '../../global/form/WrapInput';
import Label from '../../global/form/Label';
import Input from '../../global/form/Input';
import Range from '../../global/form/Range';
import Switch from '../../global/form/Switch';

const TextImage = () => {
    // Global state
    // state to read and dispatch to modify
    const meme = useContext(MemeContext);

    const handleTopText = e => {
        meme.dispatch({ type: 'UPDATE_TOP', payload: e.target.value });
    };

    const handleBottomText = e => {
        meme.dispatch({ type: 'UPDATE_BOTTOM', payload: e.target.value });
    };

    const handleTextPos = (e, pos) => {
        if (pos === 'top') {
            meme.dispatch({ type: 'UPDATE_TOP_POS', payload: e.target.value });
        } else {
            meme.dispatch({
                type: 'UPDATE_BOTTOM_POS',
                payload: e.target.value,
            });
        }
    };

    const handleTextSize = (e, pos) => {
        if (pos === 'top') {
            meme.dispatch({ type: 'UPDATE_TOP_SIZE', payload: e.target.value });
        } else {
            meme.dispatch({
                type: 'UPDATE_BOTTOM_SIZE',
                payload: e.target.value,
            });
        }
    };

    const handleTextOutside = e => {
        console.log(e.target.value);
        meme.dispatch({ type: 'TEXT_OUTSIDE' });
    };

    // Render
    return (
        <TextWrapper className={meme.state.imageSelected ? 'active' : ''}>
            <Title as="h3" fsize="1.5" margin="0 0 1rem">
                Set your text here
            </Title>

            {/* Top Text */}
            <WrapInput>
                <Label primary htmlFor="text-top">
                    Top text
                </Label>
                <Input
                    intype="text"
                    id="text-top"
                    onChange={handleTopText}
                    value={meme.state.topText}
                    disabled={!meme.state.imageSelected}
                />
            </WrapInput>

            <WrapInput flex>
                <div className={meme.state.textOutside ? 'inactive' : ''}>
                    <Label htmlFor="pos-top">
                        Text position <span>[ {meme.state.topTextPos} ]</span>
                    </Label>
                    <Range
                        id="pos-top"
                        min="0"
                        max="50"
                        value={meme.state.topTextPos}
                        disabled={
                            !meme.state.imageSelected || meme.state.textOutside
                        }
                        onChange={e => handleTextPos(e, 'top')}
                    />
                </div>
                <div>
                    <Label htmlFor="size-top">
                        Text size <span>[ {meme.state.topTextSize} ]</span>
                    </Label>
                    <Range
                        id="size-top"
                        min="1"
                        max="4"
                        step="0.1"
                        value={meme.state.topTextSize}
                        disabled={!meme.state.imageSelected}
                        onChange={e => handleTextSize(e, 'top')}
                    />
                </div>
            </WrapInput>

            {/* Bottom Text */}
            <WrapInput>
                <Label primary htmlFor="text-bottom">
                    Bottom text
                </Label>
                <Input
                    intype="text"
                    id="text-bottom"
                    onChange={handleBottomText}
                    value={meme.state.bottomText}
                    disabled={!meme.state.imageSelected}
                />
            </WrapInput>

            <WrapInput flex>
                <div className={meme.state.textOutside ? 'inactive' : ''}>
                    <Label htmlFor="pos-bottom">
                        Text position{' '}
                        <span>[ {meme.state.bottomTextPos} ]</span>
                    </Label>
                    <Range
                        id="pos-bottom"
                        min="0"
                        max="50"
                        value={meme.state.bottomTextPos}
                        disabled={
                            !meme.state.imageSelected || meme.state.textOutside
                        }
                        onChange={e => handleTextPos(e, 'bottom')}
                    />
                </div>
                <div>
                    <Label htmlFor="size-bottom">
                        Text size <span>[ {meme.state.bottomTextSize} ]</span>
                    </Label>
                    <Range
                        id="size-bottom"
                        min="1"
                        max="4"
                        step="0.1"
                        value={meme.state.bottomTextSize}
                        disabled={!meme.state.imageSelected}
                        onChange={e => handleTextSize(e, 'bottom')}
                    />
                </div>
            </WrapInput>

            {/* Text outside */}
            <WrapInput>
                <Switch
                    primary={true}
                    label="Text outside the image"
                    checked={meme.state.textOutside}
                    disabled={!meme.state.imageSelected}
                    onSwitch={handleTextOutside}
                />
            </WrapInput>

            <TextLegenda>* Both of the above texts are optional.</TextLegenda>
        </TextWrapper>
    );
};

export default TextImage;
