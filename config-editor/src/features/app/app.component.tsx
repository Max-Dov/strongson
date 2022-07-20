import React, {createContext, useState} from 'react';
import './app.styles.scss';
import {WorldConfig} from '@models/world-config.model';
import {JsonViewer} from '@features/json-viewer/json-viewer.component';
import {WorldConfigEditor} from '@features/world-config-editor/world-config-editor.component';
import {SearchBar} from '@features/search-bar/search-bar.component';

export const SearchContext = createContext<{
    searchValue?: string,
    setSearchValue?: (newSearchValue: string) => void
}>({});

export const App = () => {
    const [worldConfig, setWorldConfig] = useState<Partial<WorldConfig>>({});
    const [searchValue, setSearchValue] = useState<string>('');
    const onSearchValueUpdate = (newSearchValue?: string) => {
        setSearchValue(newSearchValue?.replace(/ /g, '') || '');
    };

    return (
        <div className="app">
            <h1><strong>Strongson</strong> World Config Editor <sup>v2</sup></h1>
            <p><strong>Paste</strong> and <strong>edit</strong> world config or <strong>create</strong> it from scratch.</p>
            <SearchContext.Provider value={{searchValue, setSearchValue: onSearchValueUpdate}}>
                <div className="editor-and-json-sections">
                    <div className="world-config-section-with-search">
                        <SearchBar />
                        <WorldConfigEditor worldConfig={worldConfig} setWorldConfig={setWorldConfig}/>
                    </div>
                    <JsonViewer objectToDisplay={worldConfig} onObjectToDisplayUpdate={setWorldConfig}/>
                </div>
            </SearchContext.Provider>
        </div>
    );
};
