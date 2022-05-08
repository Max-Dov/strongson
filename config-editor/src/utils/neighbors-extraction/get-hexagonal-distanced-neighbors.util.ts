import {Tile} from '../../models/tile.model';
import {WorldGeometry} from '../../constants/world-geometry.model';
import {World} from '../../models/world.model';
import {TileHash} from '../../models/tile-hash.model';
import {getTileHash} from '../get-tile-hash.util';

/**
 * Gets distanced neighbors placed on "WorldGeometry.HEXAGONAL" grid.
 * @param coordinates - coordinates of a tile that needs its neighbors to be found.
 * @param world - world with all the tiles.
 * @param distance - distance to a neighbor.
 */
export const getHexagonalDistancedNeighbors = (
    coordinates: Tile<WorldGeometry.HEXAGONAL>['coordinates'],
    world: World<WorldGeometry.HEXAGONAL>,
    distance: number,
): World<WorldGeometry.HEXAGONAL>['tiles'] => {
    const [originX, originY, originZ] = coordinates;
    const neighborsCoordinates = new Array<Tile<WorldGeometry.HEXAGONAL>['coordinates']>();
    for (let shift = 0; shift < distance; shift++) {
        neighborsCoordinates.push([originX + distance, originY, originZ + shift]);
        neighborsCoordinates.push([originX - distance, originY, originZ - shift]);
        neighborsCoordinates.push([originX - shift, originY - distance, originZ]);
        neighborsCoordinates.push([originX + shift, originY + distance, originZ]);
        neighborsCoordinates.push([originX, originY + shift, originZ + distance]);
        neighborsCoordinates.push([originX, originY - shift, originZ - distance]);
    }
    const neighborTiles = new Map<TileHash, Tile<WorldGeometry.HEXAGONAL>>();
    neighborsCoordinates.forEach(coordinates => {
        const neighborTileHash = getTileHash(coordinates);
        const neighborTile = world.tiles.get(neighborTileHash);
        if (neighborTile) {
            neighborTiles.set(neighborTileHash, neighborTile);
        }
    });
    return neighborTiles;
};