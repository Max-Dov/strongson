import {TileHash} from '../models/tile-hash.model';
import {Tile} from '../models/tile.model';

/**
 * Generates tile hash from tile coordinates.
 */
export const getTileHash = (tile: Tile): TileHash =>
    tile.coordinates.join(',')