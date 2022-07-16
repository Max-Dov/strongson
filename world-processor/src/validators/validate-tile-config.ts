import {TileConfig} from '@models/tile-config.model';
import {validateNeighborConstraint} from '@validators/validate-neighbor-constraint';

export const validateTileConfig = (tileConfig: unknown): null | never => {
    if (typeof tileConfig !== 'object') throw new Error('TileConfig should be an object type.');

    const {
        id, neighbors, representationsIds,
        mutationWeight, mutationChance,
        minAge, maxAge,
        crowdWeightMultiplier, crowdWeightMultiplierRadius,
        neighborsMutationMultiplierRadius, neighborsMutationMultiplier,
    } = tileConfig as Partial<TileConfig>;

    /**
     * Required params checks.
     */
    if (typeof id !== 'string') throw new Error('TileConfig.id must be a string.');
    if (typeof mutationWeight !== 'number') throw new Error('TileConfig.mutationWeight must be a number.');
    if (typeof mutationChance !== 'number') throw new Error('TileConfig.mutationChance must be a number.');
    if (!Array.isArray(representationsIds)) throw new Error('TileConfig.neighbors must be an array.');

    /**
     * Optional params checks.
     */
    if (typeof neighbors !== 'undefined' && !Array.isArray(neighbors)) throw new Error('TileConfig.neighbors must be an array.');
    if (typeof minAge !== 'number' && typeof minAge !== 'undefined') throw new Error('TileConfig.minAge should be number if provided.');
    if (typeof maxAge !== 'number' && typeof maxAge !== 'undefined') throw new Error('TileConfig.maxAge should be number if provided.');
    if (typeof crowdWeightMultiplier !== 'number' && typeof crowdWeightMultiplier !== 'undefined') throw new Error('TileConfig.crowdWeightMultiplier should be number if provided.');
    if (typeof crowdWeightMultiplierRadius !== 'number' && typeof crowdWeightMultiplierRadius !== 'undefined') throw new Error('TileConfig.crowdWeightMultiplierRadius should be number  if provided.');
    if (typeof neighborsMutationMultiplier !== 'number' && typeof neighborsMutationMultiplier !== 'undefined') throw new Error('TileConfig.neighborsMutationMultiplier should be number if provided.');
    if (typeof neighborsMutationMultiplierRadius !== 'number' && typeof neighborsMutationMultiplierRadius !== 'undefined') throw new Error('TileConfig.neighborsMutationMultiplierRadius should be number if provided.');

    /**
     * Common sense checks.
     */
    if (minAge && maxAge && minAge > maxAge) throw new Error('TileConfig.minAge should be less than TileConfig.maxAge.');
    if (neighborsMutationMultiplierRadius && neighborsMutationMultiplierRadius <= 0) throw new Error('TileConfig.neighborsMutationMultiplierRadius should be greater than 0 if provided.');
    if (crowdWeightMultiplierRadius && crowdWeightMultiplierRadius <= 0) throw new Error('TileConfig.crowdWeightMultiplierRadius should be greater than 0 if provided.');
    if (neighborsMutationMultiplier && neighborsMutationMultiplier < 0) throw new Error('TileConfig.neighborsMutationMultiplier should be greater than or equal to 0 if provided.');
    if (crowdWeightMultiplier && crowdWeightMultiplier < 0) throw new Error('TileConfig.crowdWeightMultiplier should be greater than or equal to 0 if provided.');

    /**
     * Array checks.
     */
    try {
        neighbors?.forEach(validateNeighborConstraint);
    } catch (error) {
        const message = (error as Error).message;
        throw new Error(`TileConfig: ${id}; ${message}`);
    }
    if (representationsIds.length === 0) throw new Error('TileConfig.representationsIds should have at least one representation.');
    representationsIds.forEach((representationId: unknown) => {
        if (typeof representationId !== 'string') throw new Error('TileConfig.representationsIds elements should be strings.');
    });

    return null;
};