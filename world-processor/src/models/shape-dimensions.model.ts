import {TileShape} from '@constants/tile-shape.enum';

/**
 * Relation of TileShape to its dimensions (set of coordinates).
 * Order of dimensions: X, Y, Z. Orientation of axes is counterclock-wise.
 */
export interface ShapeDimensions {
    [TileShape.HEXAGONAL]: [number, number, number]
    [TileShape.TETRAGONAL]: [number, number]
    [TileShape.UNKNOWN]: []
}