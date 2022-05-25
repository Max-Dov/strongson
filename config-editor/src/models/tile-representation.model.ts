import {TileConfig} from './tile-config.model';

/**
 * Representation fields of Tile in World. All fields are related to information shown in game UI or game GUI.
 */
export interface TileRepresentation {
    /**
     * Tile ID, e.g. "castle-lvl1"
     */
    id: TileConfig['id'];
    /**
     * Name to represent to player; e.g. "Castle lvl 1"
     */
    displayName: string;
    /**
     * Representation dependent on game implementation.
     * Values can be picture address e.g. "land_grass_tile.png" or ID for picture from DB "land_grass_tile".
     */
    representation: Array<string>;
    /**
     * Tile description.
     */
    description: string;
}