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
            <h1><strong>Strongson</strong> World Config Editor <sup>v0</sup></h1>
            <p><strong>Paste</strong> and <strong>edit</strong> world config or <strong>create</strong> it from scratch.</p>
            <div className="editor-and-json-sections">
                <WorldConfigEditor worldConfig={worldConfig} setWorldConfig={setWorldConfig}/>
                <JsonViewer objectToDisplay={worldConfig} onObjectToDisplayUpdate={setWorldConfig}/>
            </div>
        </div>
    );
};
