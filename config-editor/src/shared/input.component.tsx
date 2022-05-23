import {InputHTMLAttributes, ReactNode} from 'react';

type RadioOptions = Array<{ value: string, displayLabel: string }>

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    /**
     * Label to display for input.
     */
    label: ReactNode;
    /**
     * List of options to display if input type is "radio".
     */
    radioOptions?: RadioOptions;
}

/**
 * Text or radio input.
 */
export const Input = ({label, type, value, ...htmlInputProps}: InputProps) => {
    const shouldDisplayRadioList = type === 'radio';
    return <div className="input">
        <div className="label">
            {label}
        </div>
        {shouldDisplayRadioList
            ? <RadioInput {...htmlInputProps} type="radio" value={value}/>
            : <input {...htmlInputProps} value={value || ''}/>
        }
    </div>;
};

interface RadioInputProps extends InputHTMLAttributes<HTMLInputElement> {
    /**
     * List of options to display if input type is "radio".
     */
    radioOptions?: RadioOptions;
}

/**
 * List of radio options for Input component.
 */
const RadioInput = ({radioOptions, value: inputValue, ...htmlInputProps}: RadioInputProps) =>
    <>{radioOptions?.map(({value, displayLabel}) =>
        <div key={value}>
            <input {...htmlInputProps} id={value} value={value} checked={value === inputValue}/>
            <label htmlFor={value}>{displayLabel}</label>
        </div>,
    )}</>;