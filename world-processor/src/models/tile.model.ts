import {TileShape} from '@constants/tile-shape.enum';
import {TileConfig} from '@models/tile-config.model';
import {TileRepresentation} from '@models/tile-representation.model';
import {ShapeDimensions} from '@models/shape-dimensions.model';

/**
 * Actual tile in world.
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
     * Actual chance to mutate based on neighbor mutationMagnitude and base chanceToMutate.
     */
    chanceToMutate: number;
    /**
     * Multipliers for choosing new tile during tile mutation.
     * Tiles that are more numerous around current coordinate have greater chance to be picked as next tile.
     */
    crowdWeightMultipliers: {
        [key in TileConfig['id']]: number;
    };
    /**
     * World['epoch'] when tile started existing.
     */
    birthEpoch: number;
}