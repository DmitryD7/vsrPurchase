import React from 'react';
import s from './Button.module.css';

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, React.AriaAttributes  {}

function Button(props: ButtonProps) {
    const {children, ...rest} = props;

    return (
        <button className={s.Btn} {...rest}>{children}</button>
    );
}

export default Button;