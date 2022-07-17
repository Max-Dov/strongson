import {World} from '@models/world.model';
import {TileShape} from '@constants/tile-shape.enum';
import {WorldConfig} from '@models/world-config.model';
import {Tile} from '@models/tile.model';
import {getNeighbors} from '@utils/neighbors-extraction/get-neighbors.util';

// TODO neighbors should be shared both with crowdWeight and neighborsMutation multipliers.

/**
 * Applies crowdWeight and neighborsMutation multipliers to tiles within modifiers range.
 * Tiles' Tile['chanceToMutate'] and Tile['crowdWeightMultipliers'] would be updated.
 */
export const applyTileMultipliers = <Shape extends TileShape>(
    tile: Tile<Shape>,
    world: World<Shape>,
    worldConfig: WorldConfig,
): void => {
    /**
     * Extract tile config and multipliers values.
     */
    const tileConfigId = tile.configId;
    const tileConfig = worldConfig.tiles.find(tileConfig => tileConfig.id === tileConfigId);
    if (!tileConfig) return; // should not happen, but theoretically can.
    const {
        crowdWeightMultiplier, crowdWeightMultiplierRadius,
        neighborsMutationMultiplier, neighborsMutationMultiplierRadius,
    } = tileConfig;

    /**
     * Apply crowd multipliers.
     */
    if (crowdWeightMultiplierRadius && crowdWeightMultiplier) {
        const tileNeighbors = getNeighbors(tile.coordinates, world, crowdWeightMultiplierRadius);
        for (const tileHash in tileNeighbors) {
            const neighbor = tileNeighbors[tileHash];
            if (!neighbor.crowdWeightMultipliers) {
                neighbor.crowdWeightMultipliers = {};
            }
            const currentCrowdWeightMultiplier = neighbor.crowdWeightMultipliers[tileConfigId] || 1;
            neighbor.crowdWeightMultipliers[tileConfigId] = currentCrowdWeightMultiplier * crowdWeightMultiplier;
        }
    }

    /**
     * Apply mutation chance multipliers.
     */
    if (neighborsMutationMultiplierRadius && neighborsMutationMultiplier) {
        const tileNeighbors = getNeighbors(tile.coordinates, world, neighborsMutationMultiplierRadius);
        for (const tileHash in tileNeighbors) {
            const neighbor = tileNeighbors[tileHash];
            if (!neighbor.chanceToMutate) {
                neighbor.chanceToMutate = 1;
            }
            const currentChanceToMutate = neighbor.chanceToMutate;
            neighbor.chanceToMutate = currentChanceToMutate * neighborsMutationMultiplier;
        }
    }
};