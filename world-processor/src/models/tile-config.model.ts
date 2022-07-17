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
     * List of tile representations IDs.
     *
     * Representation contains display info about tile and is dependent on game implementation.
     * But server doing calculations refers to representation by ID, allowing representation to be as flexible
     * as frontend needs.
     */
    representationsIds: Array<TileRepresentation['id']>;
    /**
     * List of neighbor constraints. Tile can exist only if all it's constraints are satisfied.
     *
     * E.g.: if "Mountain" tile needs at least 5 "Hills" tiles around it,
     * then that would be declared as neighbor constraint from "Hills", with prop "minAmount" equal to 5.
     */
    neighbors: Array<NeighborConstraint>;
    /**
     * Base chance to mutate into another tile. May be affected by neighboring tiles.
     *
     * Tile can not mutate into itself, e.g.: "Forest" tile can not mutate into "Forest" tile, technically
     * remaining same tile with reset "birthEpoch".
     *
     * Dimension is percents (%). E.g. "15" stands for "15%".
     */
    mutationChance: number;
    /**
     * Mutation chance multiplier to apply to NEIGHBORING tiles around current tile.
     *
     * If neighboring tiles need to be forced to mutate or have their mutation chance decreased, then that parameter
     * can be adjusted.
     * Mutation chance multiplier does not affect origin tile.
     *
     * Dimension is "positive number" that would be multiplied with "percents (%)" units.
     */
    mutationChanceMultiplier?: number;
    /**
     * Radius of mutation chance multiplier.
     *
     * Every tile within multiplier radius will have its mutationChance multiplied by mutationChanceMultiplier.
     *
     * Dimension is "tiles" which represents max amount of tiles between origin tile and target tile.
     */
    mutationChanceMultiplierRadius?: number;
    /**
     * Base mutation weight of tile config among other "competing" tile configs.
     *
     * May be affected by same tiles in proximity (same in terms of tiles with same tileConfigId).
     * When tile rolls "mutationChance" parameter and has to mutate into another tile, it will choose random
     * tile config, yet tile config chance to be picked is proportional to it's "weight" represented by mutationWeight.
     *
     * Dimension is "positive number".
     */
    mutationWeight: number;
    /**
     * Mutation weight multiplier to apply to SAME* tiles around current tile.
     *
     * SAME tiles are tiles with same "tileConfigId".
     * That parameter is used for grouping tiles. For example, "Forest" tiles are expected to be grouped, so
     * mutationWeightMultiplier can be adjusted to be number 2, for example. 6 "Forest" tiles on hexagonal grid will
     * increase mutationWeight of tile in between these 6 tiles by 2^6 or 64 times, thus greatly increasing chance to be
     * chosen over other possible tile configs.
     */
    mutationWeightMultiplier?: number;
    /**
     * Radius of mutation weight multiplier.
     *
     * Tiles with same tileConfigId within multiplier radius will have its mutationWeight multiplied by
     * mutationWeightMultiplier.
     *
     * Dimension is "tiles" which represents max amount of tiles between origin tile and target tile.
     */
    mutationWeightMultiplierRadius?: number;
    /**
     * Minimum amount of epoch cycles when tile will exist no matter what mutation chance is.
     */
    minAge?: number;
    /**
     * Maximum amount of epoch cycles when tile may exist.
     *
     * It may mutate before that value, but once maxAge is stepped over, tile will mutate.
     */
    maxAge?: number;
}