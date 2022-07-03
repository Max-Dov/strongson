import {NeighborConstraint} from '@models/neighbor-constraint.model';

export const validateNeighborConstraint = (neighborConstraint: unknown): null | never => {
    if (typeof neighborConstraint !== 'object') throw new Error('NeighborConstraint should be an object type.');
    const {
        configId,
        neighborConfigId,
        minAmount,
        maxAmount,
        minDistance,
        maxDistance,
    } = neighborConstraint as Partial<NeighborConstraint>;

    /**
     * Required fields checks.
     */
    if (typeof configId !== 'string') throw new Error('NeighborConstraint.configId must be a string.');
    if (typeof neighborConfigId !== 'string') throw new Error('NeighborConstraint.neighborConfigId must be a string.');
    // TODO allow maxAmount to be not specified by having "all tiles in world" state shared in constraints checks.
    /**
     * If no maxDistance specified, that means max distance parameter refers to the whole world as if
     * maxDistance was infinite. That is n^2 (n - amount of tiles in world) checks for every tile against all
     * tiles in world which is very slow and cannot be afforded for now.
     */
    if (typeof maxAmount !== 'number')
        throw new Error('NeighborConstraint.maxAmount should be number. (Field is required for now and would become optional later.)');

    /**
     * Optional fields checks.
     */
    if (typeof minAmount !== 'number' && typeof minAmount !== 'undefined')
        throw new Error('NeighborConstraint.minAmount should be number if provided.');
    // if (typeof maxAmount !== 'number' && typeof maxAmount !== 'undefined') throw new Error('NeighborConstraint.maxAmount should be number if provided.');
    if (typeof minDistance !== 'number' && typeof minDistance !== 'undefined')
        throw new Error('NeighborConstraint.minDistance should be number if provided.');
    if (typeof maxDistance !== 'number' && typeof maxDistance !== 'undefined')
        throw new Error('NeighborConstraint.maxDistance should be number if provided.');

    /**
     * Common sense checks.
     */
    if (minAmount && maxAmount && minAmount > maxAmount)
        throw new Error('NeighborConstraint.minAmount should be less than NeighborConstraint.maxAmount.')
    if (minDistance && maxDistance && minDistance > maxDistance)
        throw new Error('NeighborConstraint.minDistance should be less than NeighborConstraint.maxDistance.')
    if (typeof maxAmount === 'undefined' && typeof minAmount === 'undefined' || minAmount === 0 && maxAmount === 0)
        throw new Error('NeighborConstraint.minAmount or NeighborConstraint.maxAmount should be specified for constraint to make sense.')
    if (typeof maxDistance === 'undefined' && typeof minDistance === 'undefined' || minDistance === 0 && maxDistance === 0)
        throw new Error('NeighborConstraint.minDistance or NeighborConstraint.maxDistance should be specified for constraint to make sense.')

    return null;
};