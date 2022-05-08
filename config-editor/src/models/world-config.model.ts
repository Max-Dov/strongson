import {TileConfig} from './tile-config.model';
import {WorldGeometry} from '../constants/world-geometry.model';

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
    geometry: WorldGeometry;
}