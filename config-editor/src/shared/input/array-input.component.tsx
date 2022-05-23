import {InputHTMLAttributes} from 'react';

interface ArrayInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    onChange?: (newValues: Array<string>) => void;
}

export const ArrayInput = ({value, onChange, ...htmlInputProps}: ArrayInputProps) => {
    const onAddValue = () => {
        if (value) {
            onChange?.([...(value as Array<string>), '']);
        } else {
            onChange?.(['']);
        }
    };

    const onValueChange = (newValue: string, index: number) => {
        const newArray = [...(value as Array<string>)];
        newArray[index] = newValue;
        onChange?.(newArray);
    };

    const onRemoveValue = (index: number) => {
        const newArray = [...(value as Array<string>)];
        newArray.splice(index, 1);
        onChange?.(newArray);
    };

    return <>
        {(value as Array<string>)?.map((value, index) =>
            <div>
                <input
                    {...htmlInputProps}
                    value={value}
                    type="text"
                    onChange={(e) => onValueChange(e.target.value, index)}
                />
                <button onClick={() => onRemoveValue(index)}>Remove</button>
            </div>)}
        <button onClick={onAddValue}>Add</button>
    </>;
};