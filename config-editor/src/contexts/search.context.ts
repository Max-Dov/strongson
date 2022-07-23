import {createContext} from 'react';

/**
 * Context containing search value for fields in every editor.
 * If field matches search value, then it is displayed.
 */
export const SearchContext = createContext<{
    searchValue?: string,
    setSearchValue?: (newSearchValue: string) => void
}>({});