import React, { useState } from 'react';
// import './config-page.styles.scss';

import { TileConfig } from '../../../../../../models/tile-config.model';
import TileChanceToMutateConfigComponent from './tiles-chance-to-mutate-input';
import TileMutationMagnitudeConfigComponent from './tiles-mutation-magnitude-input';
import TileMutationMagnitudeRadiusConfigComponent from './tiles-mutation-magnitude-radius-input';
import TileMutationWeightConfigComponent from './tiles-mutation-weight-input';


const TileMutationEditor = () => {

    const [tileConfig, setTileConfig] = useState<Partial<TileConfig>>({});



    return (
        <section className="contact-form">
            <TileChanceToMutateConfigComponent tileConfig={tileConfig} setTileConfig={setTileConfig} ></TileChanceToMutateConfigComponent>
            <TileMutationMagnitudeConfigComponent tileConfig={tileConfig} setTileConfig={setTileConfig} ></TileMutationMagnitudeConfigComponent>
            <TileMutationMagnitudeRadiusConfigComponent tileConfig={tileConfig} setTileConfig={setTileConfig} ></TileMutationMagnitudeRadiusConfigComponent>
            <TileMutationWeightConfigComponent tileConfig={tileConfig} setTileConfig={setTileConfig} ></TileMutationWeightConfigComponent>
        </section>
    )





}
export default TileMutationEditor;