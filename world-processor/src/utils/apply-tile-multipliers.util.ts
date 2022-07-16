import {World} from '@models/world.model';
import {TileShape} from '@constants/tile-shape.enum';
import {WorldConfig} from '@models/world-config.model';
import {Tile} from '@models/tile.model';
import {getNeighbors} from '@utils/neighbors-extraction/get-neighbors.util';

// TODO neighbors should be shared both with crowdWeight and neighborsMutation multipliers.

/**
 * Applies crowdWeight and neighborsMutation multipliers to every tile. Tiles' Tile['chanceToMutate'] and Tile['crowdWeightMultipliers'] would be updated.
 */
export const applyTileMultipliers = <Shape extends TileShape>(
    tile: Tile<Shape>,
    world: World<Shape>,
    worldConfig: WorldConfig,
): void => {
    const tileConfigId = tile.configId;
    const tileConfig = worldConfig.tiles.find(tileConfig => tileConfig.id === tileConfigId);
    if (!tileConfig) return; // should not happen, but theoretically can.
    const {
        crowdWeightMultiplier, crowdWeightMultiplierRadius,
        neighborsMutationMultiplier, neighborsMutationMultiplierRadius,
    } = tileConfig;

    if (crowdWeightMultiplierRadius && crowdWeightMultiplier) {
        const tileNeighbors = getNeighbors(tile.coordinates, world, crowdWeightMultiplierRadius);
        for (const tileHash in tileNeighbors) {
            const tile = tileNeighbors[tileHash];
            if (!tile.crowdWeightMultipliers) {
                tile.crowdWeightMultipliers = {};
            }
            tile.crowdWeightMultipliers[tileConfigId] = (tile.crowdWeightMultipliers[tileConfigId] || 1) * crowdWeightMultiplier;
        }
    }

    if (neighborsMutationMultiplierRadius && neighborsMutationMultiplier) {
        const tileNeighbors = getNeighbors(tile.coordinates, world, neighborsMutationMultiplierRadius);
        for (const tileHash in tileNeighbors) {
            const tile = tileNeighbors[tileHash];
            if (!tile.chanceToMutate) {
                tile.chanceToMutate = 1;
            }
            tile.chanceToMutate = (tile.chanceToMutate || 1) * neighborsMutationMultiplier;
        }
    }
};