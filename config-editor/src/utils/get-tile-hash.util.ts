import {TileHash} from '../models/tile-hash.model';
import {Tile} from '../models/tile.model';
import {WorldGeometry} from '../constants/world-geometry.model';

/**
 * Generates tile hash from tile coordinates based on tile geometry.
 */
export const getTileHash = (tileCoordinates: Tile<WorldGeometry>['coordinates']): TileHash =>
    tileCoordinates.join(',')

// TODO ration hex tile coordinates before hashing