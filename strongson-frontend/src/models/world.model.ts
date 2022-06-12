import {WorldConfig} from '@models/world-config.model';
import {Tile} from '@models/tile.model';
import {TileHash} from '@models/tile-hash.model';
import {TileShape} from '@constants/tile-shape.model';

/**
 * Actual world.
 */
export interface World<Shape extends TileShape = TileShape.UNKNOWN> {
    /**
     * Config world is based on.
     */
    configId: WorldConfig['id'];
    /**
     * Unique seed. Used for random generation.
     */
    seed: number;
    /**
     * World iterations number.
     */
    epoch: number;
    /**
     * World geometry. Geometry stands for tile shape. Display format is dependent on geometry.
     */
    tileShape: Shape;
    /**
     * World dimensions.
     * Starting point is [0, 0, ...], then dimensions can be represented as point with maximum values for every dimension.
     */
    dimensions: Tile<Shape>['coordinates'];
    /**
     * World tiles.
     */
    tiles: Map<TileHash, Tile<Shape>>;
}