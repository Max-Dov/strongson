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
        mutationWeightMultiplier, mutationWeightMultiplierRadius,
        mutationChanceMultiplier, mutationChanceMultiplierRadius,
    } = tileConfig;

    /**
     * Apply crowd multipliers.
     */
    if (mutationWeightMultiplierRadius && mutationWeightMultiplier) {
        const tileNeighbors = getNeighbors(tile.coordinates, world, mutationWeightMultiplierRadius);
        for (const tileHash in tileNeighbors) {
            const neighbor = tileNeighbors[tileHash];
            if (!neighbor.mutationWeightMultipliers) {
                neighbor.mutationWeightMultipliers = {};
            }
            const currentCrowdWeightMultiplier = neighbor.mutationWeightMultipliers[tileConfigId] || 1;
            neighbor.mutationWeightMultipliers[tileConfigId] = currentCrowdWeightMultiplier * mutationWeightMultiplier;
        }
    }

    /**
     * Apply mutation chance multipliers.
     */
    if (mutationChanceMultiplierRadius && mutationChanceMultiplier) {
        const tileNeighbors = getNeighbors(tile.coordinates, world, mutationChanceMultiplierRadius);
        for (const tileHash in tileNeighbors) {
            const neighbor = tileNeighbors[tileHash];
            if (!neighbor.mutationChance) {
                neighbor.mutationChance = 1;
            }
            const currentChanceToMutate = neighbor.mutationChance;
            neighbor.mutationChance = currentChanceToMutate * mutationChanceMultiplier;
        }
    }
};