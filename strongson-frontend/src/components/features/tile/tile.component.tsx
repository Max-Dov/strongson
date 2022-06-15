import React from 'react';
import {Tile as TileModel} from '@models/tile.model';
import {TILE_REPRESENTATIONS} from '@constants/tile-representations.const';
import {Image} from '@components/shared/image.component';
import {TileShape} from '@constants/tile-shape.model';

interface TileProps {
    tile: TileModel<TileShape.HEXAGONAL>;
}

const sin30 = Math.sin(Math.PI / 6)
const cos30 = Math.cos(Math.PI / 6)

const transformTileCoordsToPlaneCoords = (tileCoordinates: TileModel<TileShape.HEXAGONAL>['coordinates']): [number, number, number] => {
    const [x, y, z] = tileCoordinates;

    return [
        x - (y + z) * sin30,
        (z - y) * cos30,
        0
    ]
}

/**
 * ThreeJS Tile representation.
 */
export const Tile = ({tile}: TileProps) => {
    const {representationId, configId, coordinates} = tile;
    const representations = TILE_REPRESENTATIONS.get(configId);
    let representation = representations?.find(representation => representation.id === representationId);
    if (!representation && representations) {
        representation = representations[Math.trunc(Math.random() * representations.length)]
    }
    if (!representation) {
        return null;
    }

    const decardCoords = transformTileCoordsToPlaneCoords(coordinates)

    return <Image url={representation.pictureUrl} position={decardCoords}/>
};