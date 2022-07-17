import {World} from '@models/world.model';
import {Tile} from '@models/tile.model';
import {TileShape} from '@constants/tile-shape.enum';

/**
 * Filters tiles by tileId.
 */
export const filterTilesByConfigId = <Shape extends TileShape>(
    tiles: World<Shape>['tiles'],
    tileId: Tile['configId'],
): World<Shape>['tiles'] => {
    const result: World<Shape>['tiles'] = {};
    for (const tileHash in tiles) {
        const tile = tiles[tileHash];
        if (tile.configId === tileId) {
            result[tileHash] = tile;
        }
    }
    return result;
};