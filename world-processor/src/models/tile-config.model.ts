import {NeighborConstraint} from '@models/neighbor-constraint.model';
import {TileRepresentation} from '@models/tile-representation.model';

/**
 * Single tile config.
 */
export interface TileConfig {
    /**
     * Unique tile ID; e.g. "castle-lvl1".
     */
    id: string;
    /**
     * List of tile representations ids.
     */
    representationsIds: Array<TileRepresentation['id']>;
    /**
     * List of neighbor constraints.
     */
    neighbors: Array<NeighborConstraint>;
    /**
     * Base chance to mutate into another tile. Dimension is %. E.g. "15" stands for "15%".
     */
    mutationChance: number;
    /**
     * Multiplier on neighbor tiles that affects their mutationChance.
     */
    neighborsMutationMultiplier?: number;
    /**
     * Radius of multiplier on neighbor tiles that affects their mutationChance.
     */
    neighborsMutationMultiplierRadius?: number;
    /**
     * Factor to count when tile needs to mutate into another tile.
     *
     * For example, when tile must mutate, it will roll a random number and then pick new tile.
     * New tiles with greater mutationWeight will have greater chance to be mutated into.
     */
    mutationWeight: number;
    /**
     * Factor to count when tile needs to mutate into another tile.
     *
     * For example, when tile must mutate, it will roll a random number and then pick new tile.
     * New tiles with greater number around current coordinate will have greater change to be mutated into.
     */
    crowdWeightMultiplier?: number;
    /**
     * Radius of crowd weight multiplier effect.
     */
    crowdWeightMultiplierRadius?: number;
    /**
     * Minimum amount of epoch cycles when tile may exist.
     */
    minAge?: number;
    /**
     * Maximum amount of epoch cycles when tile may exist.
     */
    maxAge?: number;
}