import React, {HTMLAttributes} from 'react';

export const TooltipSvg = (props: HTMLAttributes<SVGElement>) =>
    <svg
        xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
        viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="12" cy="12" r="9"/>
        <line x1="12" y1="17" x2="12" y2="17.01"/>
        <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4"/>
    </svg>;