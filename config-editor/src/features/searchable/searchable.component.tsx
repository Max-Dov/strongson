import {HTMLAttributes, useContext, useEffect, useState} from 'react';
import {SearchContext} from '../app/app.component';

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
    const {searchValue} = useContext(SearchContext);
    const shouldDisplay = !searchValue || lookupString.includes(searchValue.toLowerCase());

    useEffect(() => {
        setLookupString(searchList.join('').toLowerCase());
    }, [searchList]);

    return <>
        {shouldDisplay && children}
    </>;
};