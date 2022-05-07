import {WorldConfig} from './world-config.model';
import {Tile} from './tile.model';

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
     * X and Y dimensions of world.
     * Note: would be changed when "chanks" would be implemented;
     */
    dimensions: [number, number];
    /**
     * World tiles.
     */
    tiles: Array<Tile>;
}