import {HTMLAttributes, useContext, useEffect, useState} from 'react';
import {SearchContext} from '../world-config-editor/world-config-editor.component';

interface SearchProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * List that contains items that are searched by.
     */
    searchList: string[];
}

/**
 * Component displays children only if searched string is empty or is contained in searchable list.
 * Searched string is extracted from WorldConfig SearchContext.
 */
export const Searchable = ({
    searchList,
    children,
}: SearchProps) => {
    const [lookupString, setLookupString] = useState<string>('');
    const searchedString = useContext(SearchContext)
    const shouldDisplay = !searchedString || lookupString.includes(searchedString.toLowerCase());

    useEffect(() => {
        setLookupString(searchList.join('').toLowerCase());
    }, [searchList]);

    return <>
        {shouldDisplay && children}
    </>;
};