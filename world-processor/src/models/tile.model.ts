import {TileShape} from '@constants/tile-shape.enum';
import {TileConfig} from '@models/tile-config.model';
import {TileRepresentation} from '@models/tile-representation.model';
import {ShapeDimensions} from '@models/shape-dimensions.model';

/**
 * Actual tile in world.
 *
 * Notes:
 * - "configId" changes every time "mutationChance" procs on every world iteration.
 * - "representationId" and "birthEpoch" change with every change of "configId"
 * - "coordinates" are not expected to be changed after initialization, but it's up to game implementation how to handle them.
 * - "mutationChance" and "mutationWeightMultipliers" are expected to be revised on every world iteration.
 */
export interface Tile<Shape extends TileShape = TileShape.UNKNOWN> {
    /**
     * Tile Config ID.
     */
    configId: TileConfig['id'];
    /**
     * Variant of representation.
     */
    representationId: TileRepresentation['id'];
    /**
     * Tuple of tile coordinates.
     * Dependent on Shape.
     */
    coordinates: ShapeDimensions[Shape];
    /**
     * Actual chance to mutate, already affected by multipliers.
     *
     * For more info on chance multipliers, check TileConfig.mutationChanceMultiplier.
     */
    mutationChance: number;
    /**
     * Weight multipliers from neighboring tiles.
     *
     * Check TileConfig.mutationWeightMultiplier for more info.
     */
    mutationWeightMultipliers: {
        [key in TileConfig['id']]: number;
    };
    /**
     * World['epoch'] when tile last mutated into current form.
     */
    birthEpoch: number;
}