import React, {ButtonHTMLAttributes} from 'react';
import './button.styles.scss';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    type?: ButtonType
    size?: ButtonSize
}

export const Button = ({
    children,
    onClick,
    type = ButtonType.SECONDARY,
    size = ButtonSize.NORMAL,
    ...htmlButtonProps
}: ButtonProps): JSX.Element =>
    <button
        {...htmlButtonProps}
        type='button'
        className={`button ${type} ${size} ${htmlButtonProps.className || ''}`}
        onClick={onClick}
    >
        {children}
    </button>;

export enum ButtonType {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

export enum ButtonSize {
    SMALL = 'small',
    NORMAL = 'normal',
    BIG = 'big'
}