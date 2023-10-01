import React from 'react';
import styled from 'styled-components';

const size = 40;

const StyledSwitch = styled.div`
    position: relative;

    input[type='checkbox'] {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -10;
        opacity: 0;
        &:checked + label {
            &::after {
                left: ${size / 2}px;
                background: ${({ theme }) => theme.colors.quaternary};
            }
        }
        &:focus + label::after {
            background: ${({ theme }) => theme.colors.tertiary};
        }
        &:disabled {
            & + label::before,
            & + label::after {
                cursor: not-allowed;
            }
        }
    }

    label {
        position: relative;
        padding-left: ${size + 15}px;
        color: ${({ theme }) => theme.colors.primary};
        &::before,
        &::after {
            content: '';
            position: absolute;
            top: 2px;
            left: 0;
            border-radius: ${size / 2}px;
        }
        &::before {
            width: ${size}px;
            height: ${size / 2}px;
            background: ${({ theme }) => theme.colors.white};
        }
        &::after {
            width: ${size / 2}px;
            height: ${size / 2}px;
            background: ${({ theme }) => theme.colors.lightGray};
            transition: left 0.4s, background-color 0.4s;
        }
    }
`;

/**
 * Custom Swtich element (on / off)
 * @param {string} label - Label text for the element
 * @param {boolean} checked - Value to set for the element
 * @param {boolean} disabled - Control the possibility of interaction
 * @param {event} onSwitch - Event handler at the switch of the element
 */
const Switch = ({ label, checked, disabled, onSwitch }) => {
    return (
        <StyledSwitch>
            <input
                id="text-include"
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={onSwitch}
            />
            <label htmlFor="text-include">{label}</label>
        </StyledSwitch>
    );
};

export default Switch;
