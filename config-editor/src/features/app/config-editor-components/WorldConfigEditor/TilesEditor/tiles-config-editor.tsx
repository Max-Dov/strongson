import React, { useState } from 'react';
// import './config-page.styles.scss';

import { TileConfig } from '../../../../../models/tile-config.model';

import TileIdConfigComponent from './TilesIdInput/tiles-id-input';
import TileMutationEditor from './TilesMutationEditor/tile-mutation-editor';
import TileNameConfigComponent from './TilesNameInput/tiles-name-input';
import TileNeighborConstraintEditor from './TilesNeighborsEditor/tiles-neighbors-config';
import TileRepresentationConfigComponent from './TilesRepresentationInput/tiles-representation-input';

const TileConfigPage = () => {

    const [tileConfig, setTileConfig] = useState<Partial<TileConfig>>({});



    return (
        <section className="contact-form">
            <TileIdConfigComponent tileConfig={tileConfig} setTileConfig={setTileConfig} ></TileIdConfigComponent>
            <TileNameConfigComponent tileConfig={tileConfig} setTileConfig={setTileConfig} ></TileNameConfigComponent>
            <TileRepresentationConfigComponent tileConfig={tileConfig} setTileConfig={setTileConfig} ></TileRepresentationConfigComponent>
            <TileMutationEditor />
            <TileNeighborConstraintEditor />
        </section>
    )





}
export default TileConfigPage;