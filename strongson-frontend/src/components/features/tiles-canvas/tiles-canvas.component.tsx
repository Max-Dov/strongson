import {Tile as TileModel} from '@models/tile.model';
import {TileShape} from '@constants/tile-shape.model';
import {Tile} from '@components/features/tile/tile.component';
import {Canvas} from '@react-three/fiber';
import React, {Suspense, useRef} from 'react';
import {MapControls, Stats} from '@react-three/drei';
import './tiles-canvas.styles.scss';

interface TilesCanvasProps {
    tiles: TileModel<TileShape.HEXAGONAL>[];
}

/**
 * Canvas displaying world tiles.
 */
export const TilesCanvas = ({tiles}: TilesCanvasProps) => {
    const statsRef = useRef(null);
    const renderTile = (tile: TileModel<TileShape.HEXAGONAL>) => {

        return <Tile key={tile.coordinates.join(',')} tile={tile}/>;
    }

    const timeStart = new Date().getTime();
    const canvasTiles = tiles.map(renderTile)
    const timeEnd = new Date().getTime();
    console.info(`Took ${timeEnd - timeStart}ms to compose tiles`)

    return (
        <div className="tiles-canvas-container">
            <Canvas orthographic camera={{position: [0, 0, 50], zoom: 50, up: [0, 0, 1], far: 10000}}>
                <Suspense fallback={null}>
                    {canvasTiles}
                </Suspense>
                <MapControls enableRotate={false}/>
            </Canvas>
            <div className="stats" ref={statsRef}>
                <Stats className="panel" showPanel={0} parent={statsRef}/>
                <Stats className="panel" showPanel={2} parent={statsRef}/>
            </div>
        </div>
    );
};