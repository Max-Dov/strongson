import React, {HTMLAttributes, useEffect, useRef, useState} from 'react';
import './tooltip.styles.scss';

export const Tooltip = ({children}: HTMLAttributes<HTMLElement>) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState<boolean>(false);
    const isDisplayed = isHovered || isActive;

    useEffect(() => {
        if (isDisplayed) {
            const tooltipElement = tooltipRef.current;
            if (tooltipElement) {
                const {left, right} = tooltipElement.getBoundingClientRect();
                if (left < 0) {
                    tooltipElement.style.left = `calc(${-left}px + 1em)`;
                } else if (right < 0) {
                    // TODO didn't check and not sure I did math there right
                    tooltipElement.style.right = `calc(${-right}px + 1em)`;
                }
            }
        }
    }, [isDisplayed]);

    return <div className="tooltip-container">
        <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsActive(!isActive)}
            type="button"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                strokeLinejoin="round"
                className={isActive ? 'is-active' : ''}
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="12" cy="12" r="9"/>
                <line x1="12" y1="17" x2="12" y2="17.01"/>
                <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4"/>
            </svg>

        </button>
        {(isDisplayed) && <div className="tooltip-text" ref={tooltipRef}>
            {children}
        </div>}
    </div>;
};