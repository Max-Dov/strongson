import {WorldConfig} from '../models/world-config.model';
import {World} from '../models/world.model';
import {Tile} from '../models/tile.model';
import {rng} from './rng.util';
import {TileConfig} from '../models/tile-config.model';
import {TileHash} from '../models/tile-hash.model';
import {getTileHash} from './get-tile-hash.util';

/**
 * Generates World. Expected use case is preview of possible world for given world config.
 */
export const generateWorld = (
    config: WorldConfig,
    seed: World['seed'],
    epoch: World['epoch'],
    dimensions: World['dimensions'],
): World => {
    const tiles = new Map<TileHash, Tile>();
    const availableTiles = [...config.tiles.values()];

    /**
     * Create starting tile.
     */
    const startingTile = getStartingTile(availableTiles, seed, epoch);
    tiles.set(getTileHash(startingTile), startingTile)

    return {
        configId: config.id,
        seed,
        epoch,
        dimensions,
        tiles,
    }
};

const getStartingTile = (
    availableTileConfigs: TileConfig[],
    seed: World['seed'],
    epoch: World['epoch'],
): Tile => {
    const coordinates: Tile['coordinates'] = [0, 0]
    const tileNumberRng = rng(seed, epoch, coordinates);
    const tileRepresentationRng = rng(seed, epoch, coordinates);
    const tileConfig = availableTileConfigs[Math.trunc(tileNumberRng * availableTileConfigs.length + 1)];
    const availableRepresentation = tileConfig.representation
    const representation = availableRepresentation?.[tileRepresentationRng * availableRepresentation.length] || availableRepresentation
    return {
        id: tileConfig.id,
        representation,
        coordinates,
        chanceToMutate: tileConfig.chanceToMutate
    }
};
