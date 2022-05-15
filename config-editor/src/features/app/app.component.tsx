import React from 'react';
import './app.styles.scss';
import ConfigPage from './config-editor-components/config-page/config-page'


export const App = () => (
    <div className="App">
        <h1>Strongson's Config Editor v0</h1>
        <ConfigPage />
    </div>
);

export default App;
