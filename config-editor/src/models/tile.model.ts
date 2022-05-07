import {TileConfig} from './tile-config.model';

/**
 * Actual tile in world.
 */
export interface Tile {
    /**
     * Unique tile ID.
     */
    id: TileConfig['id'];
    /**
     * Representation or variant of representation.
     */
    representation: TileConfig['representation'][number]
    /**
     * Tuple of X and Y coordinates.
     */
    coordinates: [number, number];
    /**
     * Actual chance to mutate based on neighbor mutationMagnitude and base chanceToMutate.
     */
    chanceToMutate: number;
}