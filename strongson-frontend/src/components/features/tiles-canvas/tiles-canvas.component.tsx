import {Tile as TileModel} from '@models/tile.model';
import {TileShape} from '@constants/tile-shape.model';
import {Tile} from '@components/features/tile/tile.component';
import {Canvas} from '@react-three/fiber';
import React, {Suspense} from 'react';
import {MapControls} from '@react-three/drei';
import './tiles-canvas.styles.scss';

interface TilesCanvasProps {
    tiles: TileModel<TileShape.HEXAGONAL>[];
}

/**
 * Canvas displaying world tiles.
 */
export const TilesCanvas = ({tiles}: TilesCanvasProps) => {
    const renderTile = (tile: TileModel<TileShape.HEXAGONAL>) => <Tile key={tile.coordinates.join(',')} tile={tile}/>;

    return (
        <div className="tiles-canvas-container">
            <Canvas orthographic camera={{position: [0, 0, 50], zoom: 50, up: [0, 0, 1], far: 10000}}>
                <Suspense fallback={null}>
                    {tiles.map(renderTile)}
                </Suspense>
                <MapControls enableRotate={false}/>
            </Canvas>
        </div>
    );
};