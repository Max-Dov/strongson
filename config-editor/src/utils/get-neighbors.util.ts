import {World} from '../models/world.model';

/**
 * Gets neighbors within certain distance.
 * TODO implementation should depend on WorldConfig['worldGeometry']; for now it's just for hexagons
 */
export const getNeighbors = (worldTiles: World['tiles'], distance: number): World['tiles'] => {
    return new Map()
}

