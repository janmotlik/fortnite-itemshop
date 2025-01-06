import * as React from 'react';
import './Button.css'

interface ButtonProps {
    variant: 'primary' | 'secondary'
    onClick: () => void
    icon?: React.ReactNode
    value: string
}

export default function Button({ variant, onClick, icon, value }: ButtonProps) {
    return (
        <button className={`button-${variant}`} onClick={onClick}>
            {icon && <span>{icon}</span>}
            {value}
        </button>
    )
}