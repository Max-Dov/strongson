import React from 'react';

const Button = (props: { onClick: React.MouseEventHandler<HTMLButtonElement> | undefined; text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {

    return (

        <button className="Button" onClick={props.onClick}>{props.text}</button>

    );
}

export { Button };