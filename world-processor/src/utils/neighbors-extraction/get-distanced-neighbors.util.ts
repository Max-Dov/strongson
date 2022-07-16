import {TileShape} from '@constants/tile-shape.enum';
import {Tile} from '@models/tile.model';
import {World} from '@models/world.model';
import {getTileHash} from '@utils/get-tile-hash.util';

/**
 * Gets neighbors within exact distance.
 * @param coordinates - coordinates of a tile that needs its neighbors to be found.
 * @param world - world with all the tiles.
 * @param distance - distance to a neighbor.
 */
export const getDistancedNeighbors = <T extends TileShape = TileShape.UNKNOWN>(
    coordinates: Tile<T>['coordinates'],
    world: World<T>,
    distance: number,
): World<T>['tiles'] => {
    if (distance === 0) {
        const result: World<T>['tiles'] = {};
        const originTileHash = getTileHash(coordinates, world.tileShape);
        const originTile = world.tiles[originTileHash];
        if (originTile) {
            result[originTileHash] = originTile;
        }
        return result;
    }
    switch (world.tileShape) {
        case TileShape.HEXAGONAL:
            return getHexagonalDistancedNeighbors(
                coordinates as Tile<TileShape.HEXAGONAL>['coordinates'],
                world as World<TileShape.HEXAGONAL>,
                distance,
            ) as World<T>['tiles'];
        case TileShape.TETRAGONAL:
        case TileShape.UNKNOWN:
        default:
            return {} as World<T>['tiles'];
    }
};

/**
 * Gets distanced neighbors placed on "WorldGeometry.HEXAGONAL" grid.
 * @param coordinates - coordinates of a tile that needs its neighbors to be found.
 * @param world - world with all the tiles.
 * @param distance - distance to a neighbor.
 */
export const getHexagonalDistancedNeighbors = (
    coordinates: Tile<TileShape.HEXAGONAL>['coordinates'],
    world: World<TileShape.HEXAGONAL>,
    distance: number,
): World<TileShape.HEXAGONAL>['tiles'] => {
    const [originX, originY, originZ] = coordinates;
    const neighborsCoordinates = new Array<Tile<TileShape.HEXAGONAL>['coordinates']>();
    for (let shift = 0; shift < distance; shift++) {
        neighborsCoordinates.push([originX + distance, originY, originZ + shift]);
        neighborsCoordinates.push([originX - distance, originY, originZ - shift]);
        neighborsCoordinates.push([originX - shift, originY - distance, originZ]);
        neighborsCoordinates.push([originX + shift, originY + distance, originZ]);
        neighborsCoordinates.push([originX, originY + shift, originZ + distance]);
        neighborsCoordinates.push([originX, originY - shift, originZ - distance]);
    }
    const neighborTiles: World<TileShape.HEXAGONAL>['tiles'] = {};
    neighborsCoordinates.forEach(coordinates => {
        const neighborTileHash = getTileHash(coordinates, world.tileShape);
        const neighborTile = world.tiles[neighborTileHash];
        if (neighborTile) {
            neighborTiles[neighborTileHash] = neighborTile;
        }
    });
    return neighborTiles;
};