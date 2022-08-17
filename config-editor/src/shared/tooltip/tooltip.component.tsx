import React, {HTMLAttributes, ReactElement, useEffect, useRef, useState} from 'react';
import './tooltip.styles.scss';
import {TooltipSvg} from '@svgs/tooltip.svg';

interface TooltipProps extends Pick<HTMLAttributes<HTMLElement>, 'children'> {
    /**
     * Tooltip SVG override in case "question in circle" is not good enough.
     */
    customTooltip?: ReactElement;
}

export const Tooltip = ({children, customTooltip}: TooltipProps) => {
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
            className={isActive ? 'is-active' : ''}
        >
            {customTooltip
                ? <span >{customTooltip}</span>
                : <TooltipSvg />}
        </button>
        {(isDisplayed) && <div className="tooltip-text" ref={tooltipRef}>
            {children}
        </div>}
    </div>;
};