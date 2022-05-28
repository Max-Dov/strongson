import {ChangeEvent, InputHTMLAttributes, ReactNode} from 'react';
import {RadioInput} from './radio-input.component';
import {ArrayInput} from './array-input.component';
import './input.styles.scss'

type RadioOptions = Array<{ value: string, displayLabel: string }>

interface InputProps<ValueType extends (string | Array<string> | number) = string> extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    /**
     * Label to display for input.
     */
    label?: ReactNode;
    /**
     * List of options to display if input type is "radio".
     */
    radioOptions?: RadioOptions;
    /**
     * Input type. If "array" is selected, then multiple inputs are specified.
     */
    type?: InputHTMLAttributes<HTMLInputElement>['type'] | 'array';
    /**
     * On input value change callback.
     */
    onChange?: (value: ValueType) => void;
    /**
     * Input value to set.
     */
    value?: ValueType;
    /**
     * Display property of Input container. 'block' by default
     */
    display?: 'block' | 'inline-block';
}

/**
 * Input that can be multiple radio options or multiple text inputs, or default input.
 */
export const Input = <ValueType extends (string | Array<string> | number) = string, >({
    label,
    type,
    value,
    onChange,
    display = 'block',
    ...htmlInputProps
}: InputProps<ValueType>) => {
    const defaultOnChange = (e: ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value as ValueType);
    const arrayOnChange = (newValues: Array<string>) => onChange?.(newValues as ValueType);
    const numberOnChange = (e: ChangeEvent<HTMLInputElement>) => onChange?.((e.target.valueAsNumber || 0) as ValueType);
    let inputElement = <input {...htmlInputProps} value={value || ''} onChange={defaultOnChange}/>;
    switch (type) {
        case 'radio':
            inputElement = <RadioInput {...htmlInputProps} type="radio" value={value} onChange={defaultOnChange}/>;
            break;
        case 'array':
            inputElement = <ArrayInput {...htmlInputProps} type="text" value={value} onChange={arrayOnChange}/>;
            break;
        case 'number':
            inputElement = <input {...htmlInputProps} type="number" value={value} onChange={numberOnChange}/>
            break;
    }
    return <div className={`input ${display}`}>
        {label && <label htmlFor={htmlInputProps.id}>
            {label}
        </label>}
        {inputElement}
    </div>;
};

