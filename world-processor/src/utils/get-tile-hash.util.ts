import {Tile} from '@models/tile.model';
import {TileShape} from '@constants/tile-shape.enum';
import {TileHash} from '@models/tile-hash.model';

/**
 * Generates tile hash from tile coordinates based on tile geometry.
 */
export const getTileHash = (tileCoordinates: Tile<TileShape>['coordinates']): TileHash =>
    tileCoordinates.join(',');
