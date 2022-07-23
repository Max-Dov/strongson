import {HTMLAttributes, useContext, useEffect, useState} from 'react';
import React from 'react';
import {SearchContext} from '@contexts/search.context';

interface SearchProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * List that contains keywords that can be searched by.
     */
    keywords: string[];
}

/**
 * Component displays children only if searched string is empty or is contained in searchable list.
 * Searched string is extracted from WorldConfig SearchContext.
 */
export const Searchable = ({
    keywords,
    children,
}: SearchProps) => {
    const [lookupString, setLookupString] = useState<string>('');
    const {searchValue} = useContext(SearchContext);
    const shouldDisplay = !searchValue || lookupString.includes(searchValue.toLowerCase());

    useEffect(() => {
        setLookupString(keywords.join('').toLowerCase());
    }, [keywords]);

    return <>
        {shouldDisplay && children}
    </>;
};