import {World} from '../../models/world.model';
import {Tile} from '../../models/tile.model';

/**
 * Filters tiles by tileId.
 */
export const filterTiles = (tiles: World['tiles'], tileId: Tile['id']): World['tiles'] => {
    const result: World['tiles'] = new Map()
    for (const [hash, tile] of tiles) {
        if (tile.id === tileId) {
            result.set(hash, tile)
        }
    }
    return result
}