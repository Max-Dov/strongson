import {World} from '../../models/world.model';
import {Tile} from '../../models/tile.model';
import {WorldGeometry} from '../../constants/world-geometry.model';

/**
 * Filters tiles by tileId.
 */
export const filterTiles = <Geometry extends WorldGeometry>(tiles: World<Geometry>['tiles'], tileId: Tile<Geometry>['id']): World<Geometry>['tiles'] => {
    const result: World<Geometry>['tiles'] = new Map()
    for (const [hash, tile] of tiles) {
        if (tile.id === tileId) {
            result.set(hash, tile)
        }
    }
    return result
}