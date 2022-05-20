import React, { useState } from 'react';
// import './config-page.styles.scss';
import GeometryConfigComponent from './WorldGeometryInput/world-geometry-input.component'
import IdConfigComponent from './WorldIdInput/world-id-input.component';
import ResultConfigComponent from '../WorldConfigResults/world-config-results.component';
import { WorldConfig } from '../../../../models/world-config.model';
import { TileConfig } from '../../../../models/tile-config.model';
import TileNameConfigComponent from './TilesEditor/TilesNameInput/tiles-name-input';
import TileConfigPage from './TilesEditor/tiles-config-editor';

const ConfigPage = () => {


    const [worldConfig, setWorldConfig] = useState<Partial<WorldConfig>>({});
    const [tileConfig, setTileConfig] = useState<Partial<TileConfig>>({});




    return (
        <section className="contact-form">
            <IdConfigComponent worldConfig={worldConfig} setWorldConfig={setWorldConfig} />
            <GeometryConfigComponent worldConfig={worldConfig} setWorldConfig={setWorldConfig} />
            <TileConfigPage />
            <ResultConfigComponent worldConfig={worldConfig} tileConfig={tileConfig} ></ResultConfigComponent>
        </section>
    )





}
export default ConfigPage;