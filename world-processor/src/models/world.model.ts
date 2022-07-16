import {TileShape} from '@constants/tile-shape.enum';
import {WorldConfig} from '@models/world-config.model';
import {Tile} from '@models/tile.model';
import {TileHash} from '@models/tile-hash.model';

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
     * World tile shape. Distance between tiles and world display is dependent on what shape tiles have.
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
    tiles: {
        [key in TileHash]: Tile<Shape>
    };
}