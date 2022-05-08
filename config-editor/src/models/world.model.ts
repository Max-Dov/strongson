import {WorldConfig} from './world-config.model';
import {Tile} from './tile.model';
import {TileHash} from './tile-hash.model';
import {WorldGeometry} from '../constants/world-geometry.model';

/**
 * Actual world.
 */
export interface World<Geometry extends WorldGeometry = WorldGeometry.UNKNOWN> {
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
    geometry: Geometry;
    /**
     * World dimensions.
     * Starting point is [0, 0, ...], then dimensions can be represented as point with maximum values for every dimension.
     */
    dimensions: Tile<Geometry>['coordinates'];
    /**
     * World tiles.
     */
    tiles: Map<TileHash, Tile<Geometry>>;
}