import {TileShape} from '@constants/tile-shape.enum';
import {Tile} from '@models/tile.model';
import {World} from '@models/world.model';
import {getDistancedNeighbors} from '@utils/neighbors-extraction/get-distanced-neighbors.util';

/**
 * Gets tile neighbors within specified distance.
 * @param coordinates - coordinates of a tile that needs its neighbors to be found.
 * @param world - world with all the tiles.
 * @param distanceMax - maximum distance to a neighbor
 * @param distanceMin - minimum distance to a neighbor
 */
export const getNeighbors = <T extends TileShape = TileShape.UNKNOWN>(
    coordinates: Tile<T>['coordinates'],
    world: World<T>,
    distanceMax: number = 1,
    distanceMin: number = 1,
): World<T>['tiles'] => {
    const neighbors: World<T>['tiles'] = {};
    for (let distance = distanceMin; distance <= distanceMax; distance++) {
        const distancedNeighbors = getDistancedNeighbors(coordinates, world, distance);
        for (let tileHash in distancedNeighbors) {
            neighbors[tileHash] = distancedNeighbors[tileHash];
        }
    }
    return neighbors;
};