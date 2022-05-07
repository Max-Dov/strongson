import {WorldConfig} from '../models/world-config.model';
import {World} from '../models/world.model';
import {Tile} from '../models/tile.model';
import {rng} from './rng.util';
import {TileConfig} from '../models/tile-config.model';
import {TileHash} from '../models/tile-hash.model';
import {getTileHash} from './get-tile-hash.util';
import {getNeighbors} from './get-neighbors.util';

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
    const availableTiles = config.tiles;
    const world = {
        configId: config.id,
        seed,
        epoch,
        dimensions,
        tiles: worldTiles,
    };

    /**
     * Create starting tile.
     */
    const startingTile = getStartingTile(availableTiles, seed, epoch);
    worldTiles.set(getTileHash(startingTile), startingTile);

    /**
     * Iterate through every dimension and create tile for every coordinate.
     */


    return world;
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

/**
 * For given coordinate, create random tile.
 */
const iterateCoordinate = (coordinate: Tile['coordinates'], world: World, configTiles: WorldConfig['tiles']) => {
    /**
     * To figure out what tile can exist on given coordinate, list of available TileConfigs should be obtained.
     * Expect that all TileConfigs are available, then for every config check its neighbor constraints.
     * If any constraint fails - tile should be excluded from available TileConfigs.
     */
    const availableTileConfigs = [...configTiles.values()].filter(tileConfig => {
        /**
         * Check if some constraint fails.
         * Tile config would pass check if there are no failed constraints.
         */
        return !tileConfig.neighbors.some(constraint => {
            const {neighborId, minAmount, maxAmount, minimumDistance, maximumDistance} = constraint;
            if (!minimumDistance && !maximumDistance) return true; // should not happen, but theoretically possible.
            if (!minAmount && !maxAmount) return true; // should not happen, but theoretically possible.
            /**
             * First, check if there are neighbors closer than allowed.
             */
            if (minimumDistance) {
                const neighbors = getNeighbors(world.tiles, minimumDistance);
                if (neighbors.size > 0) {
                    return true;
                }
            }
            if (maximumDistance) {
                //
            }
        });
    });
};