import {ButtonHTMLAttributes} from 'react';

export const RemoveCircleButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props}>
    <RemoveCircleSvg />
</button>

export const RemoveCircleSvg = () =>
<svg width="1em" height="1em" strokeWidth="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 12H16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
