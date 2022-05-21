import React, { useState } from 'react';
import './tiles-config-editor.styles.scss';

import { TileConfig } from '../../../../../models/tile-config.model';

import TileIdConfigComponent from './TilesIdInput/tiles-id-input';
import TileNameConfigComponent from './TilesNameInput/tiles-name-input';
import TileNeighborConstraintEditor from './TilesNeighborsEditor/tiles-neighbors-config';
import TileRepresentationConfigComponent from './TilesRepresentationInput/tiles-representation-input';
import TileChanceToMutateConfigComponent from './TilesMutationEditor/tiles-chance-to-mutate-input';
import TileMutationMagnitudeConfigComponent from './TilesMutationEditor/tiles-mutation-magnitude-input';
import TileMutationMagnitudeRadiusConfigComponent from './TilesMutationEditor/tiles-mutation-magnitude-radius-input';
import TileMutationWeightConfigComponent from './TilesMutationEditor/tiles-mutation-weight-input';
import { NeighborConstraint } from '../../../../../models/neighbor-constraint.model';



const NeighborEditor = ({ neighbors = [], setNeighbors }: { neighbors: NeighborConstraint[], setNeighbors: any }) => {
    const updateNeighbors = (newNeighbor: any, index: number) => {
        const newNeighbors = [...neighbors];
        newNeighbor[index] = newNeighbor;
        setNeighbors(newNeighbors);
    };

    const addNewNeighbor = () => {
        updateNeighbors({}, neighbors?.length || 0);
    };

    return <>
        {neighbors?.map((neighbor, index) => <TileNeighborConstraintEditor tileNeighborConfig={neighbor} setTileNeighborConfig={(newNeighbor: any) =>
            updateNeighbors(newNeighbor, index)} />)}
        <button onClick={addNewNeighbor}>Add new Neighbor</button>
    </>
}





const TileConfigPage = (
    { tileConfig, setTileConfig }: {
        tileConfig: Partial<TileConfig | any>
        setTileConfig: (tileConfig: Partial<TileConfig>) => void;
    }
) => {


    return (
        <section className="contact-form-tiles">
            <TileIdConfigComponent tileConfig={tileConfig} setTileConfig={setTileConfig} ></TileIdConfigComponent>
            <TileNameConfigComponent tileConfig={tileConfig} setTileConfig={setTileConfig} ></TileNameConfigComponent>
            <TileRepresentationConfigComponent tileConfig={tileConfig} setTileConfig={setTileConfig} ></TileRepresentationConfigComponent>
            <TileChanceToMutateConfigComponent tileConfig={tileConfig} setTileConfig={setTileConfig} ></TileChanceToMutateConfigComponent>
            <TileMutationMagnitudeConfigComponent tileConfig={tileConfig} setTileConfig={setTileConfig} ></TileMutationMagnitudeConfigComponent>
            <TileMutationMagnitudeRadiusConfigComponent tileConfig={tileConfig} setTileConfig={setTileConfig} ></TileMutationMagnitudeRadiusConfigComponent>
            <TileMutationWeightConfigComponent tileConfig={tileConfig} setTileConfig={setTileConfig} ></TileMutationWeightConfigComponent>
            <div>
                <NeighborEditor neighbors={tileConfig.neighbors} setNeighbors={(newNeighbors: TileConfig['neighbors']) => {
                    setTileConfig({ ...tileConfig, neighbors: newNeighbors });
                }} />
            </div>

        </section>
    )




}
export default TileConfigPage;