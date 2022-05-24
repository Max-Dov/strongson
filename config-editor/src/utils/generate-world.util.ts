import {WorldConfig} from '../models/world-config.model';
import {World} from '../models/world.model';
import {Tile} from '../models/tile.model';
import {rng} from './rng.util';
import {TileConfig} from '../models/tile-config.model';
import {getTileHash} from './get-tile-hash.util';
import {getNeighbors} from './neighbors-extraction/get-neighbors.util';
import {filterTiles} from './neighbors-extraction/filter-neighbors.util';
import {WorldGeometry} from '../constants/world-geometry.model';

/**
 * Generates World. Expected use case is preview of possible world for given world config.
 */
export const generateWorld = <Geometry extends WorldGeometry = WorldGeometry.UNKNOWN>(
    config: WorldConfig,
    seed: World<Geometry>['seed'],
    epoch: World<Geometry>['epoch'],
    dimensions: World<Geometry>['dimensions'],
): World<WorldGeometry> => {
    const worldTiles: World<Geometry>['tiles'] = new Map();
    const availableTiles = config.tiles;
    const world: World<WorldGeometry> = {
        configId: config.id,
        seed,
        epoch,
        dimensions,
        tiles: worldTiles,
        geometry: config.geometry,
    };

    if (config.geometry === WorldGeometry.UNKNOWN) { // should not happen, but theoretically can.
        return world;
    }

    /**
     * Create starting tile.
     */
    const startingTile = getStartingTile(availableTiles, seed, epoch);
    worldTiles.set(getTileHash(startingTile.coordinates), startingTile as Tile<Geometry>);

    /**
     * Iterate through every dimension and create tile for every coordinate.
     */
    // to be continued

    return world;
};

const getStartingTile = (
    availableTileConfigs: TileConfig[],
    seed: World['seed'],
    epoch: World['epoch'],
): Tile<WorldGeometry> => {
    const coordinates: Tile<WorldGeometry.HEXAGONAL>['coordinates'] = [0, 0, 0];
    /**
     * Figure out TileConfig.
     */
    const tileNumberRng = rng(seed, epoch, coordinates);
    const tileConfig = availableTileConfigs[Math.trunc(tileNumberRng * availableTileConfigs.length + 1)];
    /**
     * Figure out tile representation.
     */
    const availableRepresentation = tileConfig.representation;
    const tileRepresentationRng = rng(seed, epoch, coordinates);
    const representation = availableRepresentation[Math.trunc(tileRepresentationRng * availableRepresentation.length)];
    return {
        id: tileConfig.id,
        representation,
        coordinates,
        chanceToMutate: tileConfig.chanceToMutate,
    };
};

/**
 * For given coordinates, create random tile.
 */
const iterateCoordinates = (coordinates: Tile['coordinates'], world: World, configTiles: WorldConfig['tiles']) => {
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
                const allNeighbors = getNeighbors(coordinates, world, minimumDistance);
                const configNeighbors = filterTiles(allNeighbors, neighborId);
                if (configNeighbors.size > 0) {
                    return true;
                }
            }
            const allNeighbors = getNeighbors(coordinates, world, maximumDistance, minimumDistance);
            const configNeighbors = filterTiles(allNeighbors, neighborId);
            const neighborsAmount = configNeighbors.size;
            return maxAmount && neighborsAmount > maxAmount
                || minAmount && neighborsAmount < minAmount;
        });
    });
    // ... to be continued
    // figure out tile based on config tiles weight
};