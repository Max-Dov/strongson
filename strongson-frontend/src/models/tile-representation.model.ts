import {TileConfig} from '@models/tile-config.model';
import {ReactNode} from 'react';

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
     * Name to represent to player; e.g. "Castle lvl 1"
     */
    displayName: ReactNode;
    /**
     * Picture address URL; e.g. "land_grass_tile.png".
     */
    pictureUrl: string;
    /**
     * Tile description.
     */
    description: ReactNode;
}