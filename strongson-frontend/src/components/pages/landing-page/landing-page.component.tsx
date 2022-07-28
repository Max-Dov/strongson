import React from 'react';
import {STRONGSON_WORLD} from '@constants/strongson-world.const';
import {Tile} from '@models/tile.model';
import {TilesCanvas} from '@components/features/tiles-canvas/tiles-canvas.component';
import {TileShape} from '@constants/tile-shape.model';
import './landing-page.styles.scss';

export const LandingPage = () => {
    const tiles = Object.values(STRONGSON_WORLD.tiles) as Tile<TileShape.HEXAGONAL>[];

    return <>
        <section id="landing-page">
            <h1>
                Config ID: {STRONGSON_WORLD.configId}
            </h1>
            <p>
                <div><b>Seed:</b> {JSON.stringify(STRONGSON_WORLD.seed)}</div>
                <div><b>Epoch:</b> {JSON.stringify(STRONGSON_WORLD.epoch)}</div>
                <div><b>Dimensions:</b> {JSON.stringify(STRONGSON_WORLD.dimensions)}</div>
                <div><b>Number of tiles:</b> {Object.values(STRONGSON_WORLD.tiles).length}</div>
            </p>
            <TilesCanvas tiles={tiles}/>
        </section>
    </>;
};