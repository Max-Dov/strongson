import {Input} from '../../shared/input/input.component';
import {SearchContext} from '../app/app.component';
import {useContext} from 'react';
import './search-bar.styles.scss'

/**
 * Displays search bar for all inputs in World Config.
 */
export const SearchBar = () => {
    const {searchValue, setSearchValue} = useContext(SearchContext);
    return <div className="search-bar">
        <label htmlFor="fields-search"><strong>Search fields</strong> by name:</label>
        <Input
            id="fields-search"
            value={searchValue}
            onChange={(value) => setSearchValue?.(value)}
            placeholder="e.g. mutation"
            display="inline-block"
            type="search"
        />
    </div>;
};