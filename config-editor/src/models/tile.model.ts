import {TileConfig} from './tile-config.model';
import {WorldGeometry} from '../constants/world-geometry.model';
import {GeometryDimensions} from './geometry-dimensions.model';

/**
 * Actual tile in world.
 */
export interface Tile<Geometry extends WorldGeometry = WorldGeometry.UNKNOWN> {
    /**
     * Unique tile ID.
     */
    id: TileConfig['id'];
    /**
     * Representation or variant of representation.
     */
    representation: TileConfig['representation'][number]
    /**
     * Tuple of tile coordinates.
     * Dependent on WorldGeometry.
     */
    coordinates: GeometryDimensions[Geometry]
    /**
     * Actual chance to mutate based on neighbor mutationMagnitude and base chanceToMutate.
     */
    chanceToMutate: number;
}
