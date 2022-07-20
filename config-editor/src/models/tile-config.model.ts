import {NeighborConstraint} from '@models/neighbor-constraint.model';

/**
 * Single tile config.
 */
export interface TileConfig {
    /**
     * Unique tile ID; e.g. "castle-lvl1".
     */
    id: string;
    /**
     * List of neighbor constraints.
     */
    neighbors: Array<NeighborConstraint>;
    /**
     * List of possible tile representations ids.
     */
    representationsIds: Array<string>
    /**
     * Factor to count when tile needs to mutate into another tile.
     *
     * For example, when tile must mutate, it will roll a random number and then pick new tile.
     * Possible tiles with greater mutationWeight will have greater chance to be mutated into.
     */
    mutationWeight: number;
    /**
     * Base chance to mutate into another tile. Dimension is %. E.g. "15" stands for "15%".
     */
    mutationChance: number;
    /**
     * Factor to count when tile needs to mutate into another tile.
     * Useful when tiles need to be grouped up or loosely spread across map.
     *
     * For example, when tile must mutate, it will roll a random number and then pick new tile.
     * Possible tiles that have greater number around current coordinate will have greater chance to be mutated into.
     */
    crowdWeightMultiplier?: number;
    /**
     * Radius of crowd weight multiplier effect.
     */
    crowdWeightMultiplierRadius?: number;
    /**
     * Minimum amount of epoch cycles for tile to exist.
     */
    minAge?: number;
    /**
     * Maximum amount of epoch cycles when tile may exist. Tile may mutate earlier than that value.
     */
    maxAge?: number;
    /**
     * Multiplier on neighbor tiles that multiplies their mutationChance.
     * Useful when neighbor tiles need to be forced to mutate.
     */
    neighborsMutationMultiplier?: number;
    /**
     * Radius of neighbors mutation multiplier effect.
     */
    neighborsMutationMultiplierRadius?: number;
}