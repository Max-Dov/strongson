import {TileConfig} from './tile-config.model';
import {WorldGeometry} from '../constants/world-geometry.model';
import {GeometryDimensions} from './geometry-dimensions.model';
import {TileRepresentation} from './tile-representation.model';

/**
 * Actual tile in world.
 */
export interface Tile<Geometry extends WorldGeometry = WorldGeometry.UNKNOWN> {
    /**
     * Tile Config ID.
     */
    id: TileConfig['id'];
    /**
     * Variant of representation.
     */
    representation: TileRepresentation['representation'][number]
    /**
     * Tuple of tile coordinates.
     * Dependent on WorldGeometry.
     */
    coordinates: GeometryDimensions[Geometry]
    /**
     * Actual chance to mutate based on neighbor mutationMagnitude and base chanceToMutate.
     */
    chanceToMutate: number;
    /**
     * Number of epoch cycles lived though.
     */
    age: number;
}
