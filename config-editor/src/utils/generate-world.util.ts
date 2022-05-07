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
    const worldTiles = new Map<TileHash, Tile>();
    const availableTiles = [...config.tiles.values()];

    /**
     * Create starting tile.
     */
    const startingTile = getStartingTile(availableTiles, seed, epoch);
    worldTiles.set(getTileHash(startingTile), startingTile);



    return {
        configId: config.id,
        seed,
        epoch,
        dimensions,
        tiles: worldTiles,
    };
};

const getStartingTile = (
    availableTileConfigs: TileConfig[],
    seed: World['seed'],
    epoch: World['epoch'],
): Tile => {
    const coordinates: Tile['coordinates'] = [0, 0];
    /**
     * Figure out TileConfig.
     */
    const tileNumberRng = rng(seed, epoch, coordinates);
    const tileConfig = availableTileConfigs[Math.trunc(tileNumberRng * availableTileConfigs.length + 1)];
    /**
     * Figure out tile representation.
     */
    const availableRepresentation = tileConfig.representation;
    let representation = availableRepresentation as string;
    if (Array.isArray(availableRepresentation)) {
        const tileRepresentationRng = rng(seed, epoch, coordinates);
        representation = availableRepresentation[Math.trunc(tileRepresentationRng * availableRepresentation.length)];
    }
    return {
        id: tileConfig.id,
        representation,
        coordinates,
        chanceToMutate: tileConfig.chanceToMutate,
    };
};
