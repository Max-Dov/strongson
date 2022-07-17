import {TileConfig} from '@models/tile-config.model';

/**
 * Representation fields of Tile in World. All fields are related to information shown in game UI or game GUI.
 */
export interface TileRepresentation {
    /**
     * Representation ID; e.g. "castle-lvl1-variant-1"
     * Same tile config may have different representation variants for entertainment purposes.
     */
    id: string;
    /**
     * Tile ID, e.g. "castle-lvl1"
     */
    configId: TileConfig['id'];
    /**
     * Unknown to backend data format dependent on game implementation.
     */
    displayName: unknown;
    /**
     * Picture address URL; e.g. "land_grass_tile.png".
     */
    pictureUrl: string;
    /**
     * Unknown to backend data format dependent on game implementation.
     */
    description: unknown;
}