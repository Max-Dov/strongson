import {WorldGeometry} from '../constants/world-geometry.model';

/**
 * Relation of WorldGeometry to its dimensions (set of coordinates)
 */
export interface GeometryDimensions {
    [WorldGeometry.HEXAGONAL]: [number, number, number]
    [WorldGeometry.TETRAGONAL]: [number, number]
    [WorldGeometry.UNKNOWN]: []
}
