import {WorldConfig} from './world-config.model';
import {Tile} from './tile.model';
import {TileHash} from './tile-hash.model';

/**
 * Actual world.
 */
export interface World {
    /**
     * Config world is based on.
     */
    configId: WorldConfig['id'];
    /**
     * Unique world seed. Used for random generation.
     */
    seed: number;
    /**
     * World number of iteration. Worlds should start with 0 as starting point.
     */
    epoch: number;
    /**
     * World dimensions.
     * Starting point is [0, 0, ...], then dimensions can be represented as point with maximum values for every dimension.
     */
    dimensions: Tile['coordinates'];
    /**
     * World tiles.
     */
    tiles: Map<TileHash, Tile>;
}