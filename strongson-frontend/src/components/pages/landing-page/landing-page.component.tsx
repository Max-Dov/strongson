import React, {Suspense} from 'react';
import {Canvas} from '@react-three/fiber';
import {MapControls} from '@react-three/drei';
import './landing-page.styles.scss';
import {STRONGSON_WORLD} from '@components/pages/landing-page/strongson-world.const';
import {Tile as TileModel} from '@models/tile.model';
import {Tile} from '@components/features/tile/tile.component';
import {TileShape} from '@constants/tile-shape.model';

export const LandingPage = () => {
    const tiles = Object.values(STRONGSON_WORLD.tiles);
    const renderTile = (tile: TileModel<TileShape.HEXAGONAL>) => <Tile key={tile.coordinates.join(',')} tile={tile}/>;

    return <section id="landing-page">
        <Canvas orthographic camera={{position: [0, 0, 10], zoom: 100, up: [0, 0, 1], far: 10000}}>
            <Suspense fallback={null}>
                {tiles.map(renderTile)}
            </Suspense>
            <MapControls/>
        </Canvas>
    </section>;
};