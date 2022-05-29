import {InputHTMLAttributes} from 'react';

type RadioOptions = Array<{ value: string, displayLabel: string }>

interface RadioInputProps extends InputHTMLAttributes<HTMLInputElement> {
    /**
     * List of options to display if input type is "radio".
     */
    radioOptions?: RadioOptions;
}

/**
 * List of radio options for Input component.
 */
export const RadioInput = ({radioOptions, value: inputValue, ...htmlInputProps}: RadioInputProps) =>
    <>{radioOptions?.map(({value, displayLabel}) =>
        <div key={value}>
            <input {...htmlInputProps} id={value} value={value} checked={value === inputValue}/>
            <label htmlFor={value} className="radio-label">{displayLabel}</label>
        </div>,
    )}</>;