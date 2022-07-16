import React from 'react';
import {Tile as TileModel} from '@models/tile.model';
import {Image} from '@components/shared/image.component';
import {TileShape} from '@constants/tile-shape.model';
import {transformTileCoordsToPlaneCoords} from '@utils/transformTileCoordsToPlaneCoords';
import {getTileRepresentation} from '@utils/getTileRepresentation.util';

interface TileProps {
    tile: TileModel<TileShape.HEXAGONAL>;
}

// TODO tiles with same texture should be matrix instanced instead of re-declaring multiple meshes.
// https://threejs.org/examples/webgl_instancing_performance.html

/**
 * ThreeJS Tile representation.
 */
export const Tile = ({tile}: TileProps) => {
    const {representationId, configId, coordinates} = tile;

    const representation = getTileRepresentation(configId, representationId);
    if (!representation) {
        return null;
    }

    const planeCoords = transformTileCoordsToPlaneCoords(coordinates);

    return <Image url={representation.pictureUrl} coordinates={planeCoords} scale={0.5}/>;
};