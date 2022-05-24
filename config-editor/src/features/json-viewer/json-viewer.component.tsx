import {ChangeEvent, useEffect, useRef, useState} from 'react';
import './json-viewer.styles.scss';
import {Button} from '../../shared/button/button.component';

// TODO fix cursor position even on rerender.

interface JsonViewerProps<ObjectToDisplay extends object> {
    objectToDisplay: ObjectToDisplay;
    onObjectToDisplayUpdate: (object: ObjectToDisplay) => void;
}

/**
 * Displays passed object in text area with ability to copy object to clipboard. Listens to its changes.
 */
export const JsonViewer = <ObjectToDisplay extends object>({
    objectToDisplay,
    onObjectToDisplayUpdate,
}: JsonViewerProps<ObjectToDisplay>) => {
    const [stringifiedObject, setStringifiedObject] = useState<string>();
    const [isObjectInvalid, setIsObjectInvalid] = useState<boolean>(false);
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const [cursorPosition, setCursorPosition] = useState(0)

    /**
     * Restore cursor position on every rerender.
     */
    useEffect(() => {
        const inputEl = inputRef.current
        if (inputEl) {
            inputEl.selectionStart = cursorPosition
            inputEl.selectionEnd = cursorPosition
        }
    })

    /**
     * Try parsing input and either update object via callback or display error message.
     */
    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setCursorPosition(inputRef?.current?.selectionStart || 0)
        const newStringifiedObject = e.target.value;
        if (newStringifiedObject === '') {
            setIsObjectInvalid(false);
            onObjectToDisplayUpdate({} as ObjectToDisplay);
            return
        }
        const parsedObject = parseJsonObject(newStringifiedObject);
        if (parsedObject) {
            setIsObjectInvalid(false);
            onObjectToDisplayUpdate(parsedObject as ObjectToDisplay);
        } else { // object is null as it is invalid JSON
            setIsObjectInvalid(true);
            setStringifiedObject(newStringifiedObject);
        }
    };

    const onCopy = () => {
        navigator.clipboard.writeText(stringifiedObject || '')
    }

    /**
     * Subscription to new object outside of component.
     * These changes have greater priority, so they overwrite what is in input field currently.
     */
    useEffect(() => {
        const newStringifiedObject = JSON.stringify(objectToDisplay, null, 2);
        setStringifiedObject(newStringifiedObject);
    }, [objectToDisplay]);

    return <section className="json-viewer">
        <h2>
            JSON
            <span className="ctrl-z-note">CTRL + Z not working in that version :(</span>
        </h2>
        <textarea
            ref={inputRef}
            value={stringifiedObject}
            placeholder="Paste World Config JSON there.."
            onChange={onChange}
        />
        {isObjectInvalid && <p className={'error-message'}>
            Above object is not valid JSON.
        </p>}
        <Button onClick={onCopy}>
            Copy to clipboard
        </Button>
    </section>;
};

const parseJsonObject = (objectToParse: string): object | null => {
    try {
        return JSON.parse(objectToParse);
    } catch {
        return null;
    }
};