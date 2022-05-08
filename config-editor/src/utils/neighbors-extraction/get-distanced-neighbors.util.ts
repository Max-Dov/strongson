import {WorldGeometry} from '../../constants/world-geometry.model';
import {Tile} from '../../models/tile.model';
import {World} from '../../models/world.model';
import {TileHash} from '../../models/tile-hash.model';
import {getTileHash} from '../get-tile-hash.util';
import {getHexagonalDistancedNeighbors} from './get-hexagonal-distanced-neighbors.util';

/**
 * Gets neighbors within exact distance.
 * @param coordinates - coordinates of a tile that needs its neighbors to be found.
 * @param world - world with all the tiles.
 * @param distance - distance to a neighbor.
 */
export const getDistancedNeighbors = <T extends WorldGeometry = WorldGeometry.UNKNOWN>(
    coordinates: Tile<T>['coordinates'],
    world: World<T>,
    distance: number,
): World<T>['tiles'] => {
    if (distance === 0) {
        const result = new Map<TileHash, Tile<T>>();
        const originTileHash = getTileHash(coordinates);
        const originTile = world.tiles.get(originTileHash);
        if (originTile) {
            result.set(originTileHash, originTile);
        }
        return result;
    }
    switch (world.geometry) {
        case WorldGeometry.HEXAGONAL:
            return getHexagonalDistancedNeighbors(
                coordinates as Tile<WorldGeometry.HEXAGONAL>['coordinates'],
                world as World<WorldGeometry.HEXAGONAL>,
                distance,
            ) as World<T>['tiles'];
        case WorldGeometry.TETRAGONAL:
        case WorldGeometry.UNKNOWN:
        default:
            return new Map<TileHash, Tile<T>>();
    }
};