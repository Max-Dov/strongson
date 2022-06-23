import {TileConfig} from '@models/tile-config.model';
import {TileShape} from '@constants/tile-shape.enum';

/**
 * Config that is used by World Compilator to create world or next iteration of world.
 */
export interface WorldConfig {
    /**
     * Unique world ID; e.g. "land-world", "cloud-world".
     */
    id: string;
    /**
     * List of available tiles in the world.
     */
    tiles: Array<TileConfig>;
    /**
     * World tile geometry.
     */
    tileShape: TileShape;
}