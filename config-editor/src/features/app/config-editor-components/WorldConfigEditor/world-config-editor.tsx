import React, { useState } from 'react';
import GeometryConfigComponent from './WorldGeometryInput/world-geometry-input.component'
import IdConfigComponent from './WorldIdInput/world-id-input.component';
import ResultConfigComponent from '../WorldConfigResults/world-config-results.component';
import { WorldConfig } from '../../../../models/world-config.model';
import { TileConfig } from '../../../../models/tile-config.model';
import TileConfigPage from './TilesEditor/tiles-config-editor';



const TilesEditor = ({ tiles = [], setTiles }: { tiles: TileConfig[], setTiles: any }) => {
    const updateTiles = (newTile: any, index: number) => {
        const newTiles = [...tiles];
        newTiles[index] = newTile;
        setTiles(newTiles);
    };

    const addNewTile = () => {
        updateTiles({}, tiles?.length || 0);
    };

    return <>

        {tiles?.map((tile, index) => <TileConfigPage tileConfig={tile} setTileConfig={(newTile: any) => updateTiles(newTile, index)} />)}
        <button onClick={addNewTile}>Add new Tile</button>
    </>
}


const ConfigPage = () => {

    const [worldConfig, setWorldConfig] = useState<WorldConfig | any>({});

    return (
        <div>
            <section className="contact-form-tiles">
                <IdConfigComponent worldConfig={worldConfig} setWorldConfig={setWorldConfig} />
                <GeometryConfigComponent worldConfig={worldConfig} setWorldConfig={setWorldConfig} />
                <TilesEditor tiles={worldConfig.tiles} setTiles={(newTiles: WorldConfig['tiles']) => {
                    setWorldConfig({ ...worldConfig, tiles: newTiles });
                }} />
                <div>
                    <ResultConfigComponent worldConfig={worldConfig} ></ResultConfigComponent>
                </div>
            </section>
        </div>
    )





}
export default ConfigPage;