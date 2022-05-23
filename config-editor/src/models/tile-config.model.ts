import {NeighborConstraint} from './neighbor-constraint.model';

/**
 * Single tile config.
 */
export interface TileConfig {
    /**
     * Unique tile ID; e.g. "castle-lvl1"
     */
    id: string;
    /**
     * Name to represent to player; e.g. "Castle lvl 1"
     */
    displayName: string;
    /**
     * List of neighbor constraints.
     */
    neighbors: Array<NeighborConstraint>;
    /**
     * Representation dependent on game implementation.
     * Can be picture address e.g. "land_grass_tile.png" or ID for picture from DB "land_grass_tile".
     * Or can be different variants, which are represented as array.
     */
    representation: Array<string>;
    /**
     * Base chance to mutate into a neighbor. Dimension is %. E.g. "15" stands for "15%".
     */
    chanceToMutate: number;
    /**
     * Factor to count when tile needs to mutate into other tile.
     *
     * For example, when some tile actually have to mutate, it will roll a random number and then pick neighboring tile.
     * Neighboring tiles with greater mutationWeight will have greater chance to be mutated into.
     */
    mutationWeight: number;
    /**
     * Multiplier effect on neighbor tiles that affects their chanceToMutate.
     */
    mutationMagnitude: number;
    /**
     * Radius of multiplier effect on neighbor tiles that affects their chanceToMutate.
     */
    mutationMagnitudeRadius: number;
}