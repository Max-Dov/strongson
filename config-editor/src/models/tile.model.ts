import {TileConfig} from './tile-config.model';
import {TileShape} from '../constants/tile-shape.model';
import {ShapeDimensions} from './shape-dimensions.model';
import {TileRepresentation} from './tile-representation.model';

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
    representation: TileRepresentation['representation'][number];
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
     * World['epoch'] when tile started existing.
     */
    birthEpoch: number;
}
