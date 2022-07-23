import React, {useState} from 'react';
import './app.styles.scss';
import {WorldConfig} from '@models/world-config.model';
import {JsonViewer} from '@features/json-viewer/json-viewer.component';
import {WorldConfigEditor} from '@features/world-config-editor/world-config-editor.component';
import {SearchBar} from '@features/search-bar/search-bar.component';
import {Footer} from '@features/footer/footer.component';
import {SettingsBar} from '@features/settings-bar/settings-bar.component';
import {SearchContext} from '@contexts/search.context';
import {ConfigEditorSettings, SettingsContext} from '@contexts/settings.context';

export const App = () => {
    const [worldConfig, setWorldConfig] = useState<Partial<WorldConfig>>({});
    const [searchValue, setSearchValue] = useState<string>('');
    const [settings, setSettings] = useState<ConfigEditorSettings>({} as ConfigEditorSettings)
    const onSearchValueUpdate = (newSearchValue?: string) => {
        setSearchValue(newSearchValue?.replace(/ /g, '') || '');
    };

    return (
        <div className="app">
            <h1><strong>Strongson</strong> World Config Editor <sup>v2</sup></h1>
            <p><strong>Paste</strong> JSON and <strong>edit</strong> world config or <strong>create</strong> world
                config from scratch.
            </p>
            <SettingsContext.Provider value={{settings, setSettings}}>
                <SearchContext.Provider value={{searchValue, setSearchValue: onSearchValueUpdate}}>
                    <div className={`editor-and-json-sections ${settings.isJsonSectionBelowWorldConfig ? 'flex-column' : ''}`}>
                        <div className="world-config-section-with-bars">
                            <div className="sticky-bars">
                                <SettingsBar/>
                                <SearchBar/>
                            </div>
                            <WorldConfigEditor worldConfig={worldConfig} setWorldConfig={setWorldConfig}/>
                        </div>
                        <JsonViewer objectToDisplay={worldConfig} onObjectToDisplayUpdate={setWorldConfig}/>
                    </div>
                </SearchContext.Provider>
            </SettingsContext.Provider>
            <Footer/>
        </div>
    );
};
