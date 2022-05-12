import {TileHash} from '../models/tile-hash.model';
import {Tile} from '../models/tile.model';
import {WorldGeometry} from '../constants/world-geometry.model';
import {rationHexCoordinates} from './ration-hex-coordinates.util';

/**
 * Generates tile hash from tile coordinates based on tile geometry.
 */
export const getTileHash = (tileCoordinates: Tile<WorldGeometry>['coordinates']): TileHash => {
    if (tileCoordinates.length === 3) { // guess that's hex; TODO pass geometry as 2nd argument instead of guessing game
        return rationHexCoordinates(tileCoordinates as Tile<WorldGeometry.HEXAGONAL>['coordinates']).join(',')
    } else {
        return tileCoordinates.join(',');
    }
}

