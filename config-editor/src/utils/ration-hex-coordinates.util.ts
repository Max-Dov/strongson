import {WorldGeometry} from '../constants/world-geometry.model';
import {Tile} from '../models/tile.model';

/**
 * Rations `WorldGeometry.HEXAGONAL` coordinates.
 * Coordinate is rationed if one of coordinates is equal to 0 and 2 other are greater or equal to 0.
 * Rationing coords helps with finding distance between 2 points (d === greater coordinate)
 * and helps with hashing as rationed coordinates unambiguously correspond to exact tile and can work as grid tile ID.
 */
export const rationHexCoordinates = (coordinates: Tile<WorldGeometry.HEXAGONAL>['coordinates']): Tile<WorldGeometry.HEXAGONAL>['coordinates'] => {
    const x = coordinates[0];
    const y = coordinates[1];
    const z = coordinates[2];
    const lesserNumber = Math.min(x, y, z);
    return [x - lesserNumber, y - lesserNumber, z - lesserNumber]
};