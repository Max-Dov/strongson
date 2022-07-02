import {Tile} from '@models/tile.model';
import {TileShape} from '@constants/tile-shape.enum';
import {TileHash} from '@models/tile-hash.model';
import {rationHexCoordinates} from '@utils/ration-hex-coordinates.util';

/**
 * Generates tile hash from tile coordinates based on tile geometry.
 */
export const getTileHash = (tileCoordinates: Tile<TileShape>['coordinates'], tileShape: TileShape): TileHash => {
    if (tileShape === TileShape.HEXAGONAL) {
        return getHexagonalTileHash(tileCoordinates as  Tile<TileShape.HEXAGONAL>['coordinates'])
    }
    return tileCoordinates.join(',');
}

export const getHexagonalTileHash = (tileCoordinates: Tile<TileShape.HEXAGONAL>['coordinates']): TileHash =>
    rationHexCoordinates(tileCoordinates).join(',')
