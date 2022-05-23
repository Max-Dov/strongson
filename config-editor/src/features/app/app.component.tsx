import React, {useState} from 'react';
import './app.styles.scss';
import {WorldConfig} from '../../models/world-config.model';
import {JsonViewer} from '../json-viewer/json-viewer.component';
import {WorldConfigEditor} from '../world-config-editor/world-config-editor.component';

// TODO create tooltips for fields
// TODO create searchable

export const App = () => {
    const [worldConfig, setWorldConfig] = useState<Partial<WorldConfig>>({});

    return (
        <div className="app">
            <h1>Strongson World Config Editor v0</h1>
            <p>Paste JSON config contents below or create world config from scratch.</p>
            <div className="editor-and-json-sections">
                <WorldConfigEditor worldConfig={worldConfig} setWorldConfig={setWorldConfig}/>
                <JsonViewer objectToDisplay={worldConfig} onObjectToDisplayUpdate={setWorldConfig}/>
            </div>
        </div>
    );
};
