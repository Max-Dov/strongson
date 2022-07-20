import React, {ButtonHTMLAttributes} from 'react';

export const AddHexagonButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) =>
    <button {...props}>
        <AddHexagonSvg />
        {props.children}
    </button>

export const AddHexagonSvg = () =>
    <svg width="1em" height="1em" strokeWidth="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12H12M15 12H12M12 12V9M12 12V15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.7 1.1732C11.8856 1.06603 12.1144 1.06603 12.3 1.17321L21.2263 6.3268C21.4119 6.43397 21.5263 6.63205 21.5263 6.84641V17.1536C21.5263 17.3679 21.4119 17.566 21.2263 17.6732L12.3 22.8268C12.1144 22.934 11.8856 22.934 11.7 22.8268L2.77372 17.6732C2.58808 17.566 2.47372 17.3679 2.47372 17.1536V6.84641C2.47372 6.63205 2.58808 6.43397 2.77372 6.32679L11.7 1.1732Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>