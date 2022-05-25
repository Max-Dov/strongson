import {TileConfig} from './tile-config.model';

/**
 * Single neighbor constraint description.
 * That model describes exact tile to neighbor tiles relation, not to single neighbor tile.
 */
export interface NeighborConstraint {
    /**
     * Tile ID that has neighbors; e.g. "land-grass"
     */
    id: TileConfig['id'];
    /**
     * Reference to tile by ID; e.g. "castle-lvl1"
     */
    neighborId: TileConfig['id'];
    /**
     * Minimum amount of neighbor tiles.
     */
    minAmount?: number;
    /**
     * Maximum amount of neighbor tiles.
     */
    maxAmount?: number;
    /**
     * Minimum distance to a neighbor tiles.
     */
    minDistance?: number;
    /**
     * Maximum distance to a neighbor tiles.
     */
    maxDistance?: number;
}