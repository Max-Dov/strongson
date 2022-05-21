import React, { useState } from 'react';
// import './config-page.styles.scss';

import { NeighborConstraint } from '../../../../../../models/neighbor-constraint.model';
import TileNeighborMaxAmountConfigComponent from './TilesNeghborsMaxAmountInput/tiles-neighbors-max-amount-input';
import TileNeighborMaximumDistanceConfigComponent from './TilesNeghborsMaximumDistanceInput/tiles-neighbors-max-distance-input';
import TileNeighborMinAmountConfigComponent from './TilesNeghborsMinAmountInput/tiles-neighbors-min-amount-input';
import TileNeighborMinimumDistanceConfigComponent from './TilesNeghborsMinimumDistanceInput/tiles-neighbors-min-distance-input';
import TileNeighborIdConfigComponent from './TilesNeigbrosIdInput/tiles-neighbros-id-input';

import TileNeighborSelfIdConfigComponent from './TilesNeighborsSelfIdInput/tiles-neighbors-self-id-input';



const TileNeighborConstraintEditor = (
    { tileNeighborConfig, setTileNeighborConfig }: {
        tileNeighborConfig: Partial<NeighborConstraint>
        setTileNeighborConfig: (setTileNeighborConfig: Partial<NeighborConstraint>) => void;
    }
) => {


    return (
        <section className="contact-form">
            <TileNeighborSelfIdConfigComponent tileNeighborConfig={tileNeighborConfig} setTileNeighborConfig={setTileNeighborConfig} ></TileNeighborSelfIdConfigComponent>
            <TileNeighborIdConfigComponent tileNeighborConfig={tileNeighborConfig} setTileNeighborConfig={setTileNeighborConfig} ></TileNeighborIdConfigComponent>
            <TileNeighborMinAmountConfigComponent tileNeighborConfig={tileNeighborConfig} setTileNeighborConfig={setTileNeighborConfig} ></TileNeighborMinAmountConfigComponent>
            <TileNeighborMaxAmountConfigComponent tileNeighborConfig={tileNeighborConfig} setTileNeighborConfig={setTileNeighborConfig} ></TileNeighborMaxAmountConfigComponent>
            <TileNeighborMinimumDistanceConfigComponent tileNeighborConfig={tileNeighborConfig} setTileNeighborConfig={setTileNeighborConfig} ></TileNeighborMinimumDistanceConfigComponent>
            <TileNeighborMaximumDistanceConfigComponent tileNeighborConfig={tileNeighborConfig} setTileNeighborConfig={setTileNeighborConfig} ></TileNeighborMaximumDistanceConfigComponent>
        </section>
    )





}
export default TileNeighborConstraintEditor;