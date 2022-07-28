import React, {useState} from 'react';
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
    const [isHovered, setIsHovered] = useState(false);
    const {representationId, configId, coordinates} = tile;

    const representation = getTileRepresentation(configId, representationId);
    if (!representation) {
        return null;
    }

    const planeCoords = transformTileCoordsToPlaneCoords(coordinates);

    const onHover = () => {
        setIsHovered(true)
        console.log(coordinates)
    }

    return <Image
        url={representation.pictureUrl}
        coordinates={planeCoords} scale={isHovered ? 1.5 : 1}
        onPointerEnter={onHover}
        onPointerLeave={() => setIsHovered(false)}
    />;
};