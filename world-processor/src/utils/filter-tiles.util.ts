import {World} from '@models/world.model';
import {Tile} from '@models/tile.model';
import {TileShape} from '@constants/tile-shape.enum';

/**
 * Filters tiles by tileId.
 */
export const filterTiles = <Shape extends TileShape>(
    tiles: World<Shape>['tiles'],
    tileId: Tile['configId'],
): World<Shape>['tiles'] => {
    const result: World<Shape>['tiles'] = new Map();
    for (const [hash, tile] of tiles) {
        if (tile.configId === tileId) {
            result.set(hash, tile);
        }
    }
    return result;
};