import {HTMLAttributes, useEffect, useState} from 'react';

interface SearchProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * String from search input.
     */
    searchedString: string;
    /**
     * List that contains items that are searched by.
     */
    searchList: string[];
}

/**
 * Component displays children only if searched string is empty or is contained in searchable list.
 */
export const Searchable = ({
    searchedString,
    searchList,
    children,
}: SearchProps) => {
    const [lookupString, setLookupString] = useState<string>('');
    const shouldDisplay = !searchedString || lookupString.includes(searchedString.toLowerCase());

    useEffect(() => {
        setLookupString(searchList.join('').toLowerCase());
    }, [searchList]);

    return <>
        {shouldDisplay && children}
    </>;
};