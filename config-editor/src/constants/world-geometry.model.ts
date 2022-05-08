/**
 * List of supported world geometries. "Geometry" stands for tile shape.
 */
export enum WorldGeometry {
    HEXAGONAL = 'HEXAGONAL',
    TETRAGONAL = 'TETRAGONAL',
    /**
     * When things are really messed up.
     */
    UNKNOWN = 'UNKNOWN',
}