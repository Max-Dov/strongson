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

    /**
     * Optional fields checks.
     */
    if (typeof minAmount !== 'number' && typeof minAmount !== 'undefined') throw new Error('NeighborConstraint.minAmount should be number if provided.');
    if (typeof maxAmount !== 'number' && typeof maxAmount !== 'undefined') throw new Error('NeighborConstraint.maxAmount should be number if provided.');
    if (typeof minDistance !== 'number' && typeof minDistance !== 'undefined') throw new Error('NeighborConstraint.minDistance should be number if provided.');
    if (typeof maxDistance !== 'number' && typeof maxDistance !== 'undefined') throw new Error('NeighborConstraint.maxDistance should be number if provided.');

    /**
     * Common sense checks.
     */
    if (minAmount && maxAmount && minAmount > maxAmount) throw new Error('NeighborConstraint.minAmount should be less than NeighborConstraint.maxAmount.')
    if (minDistance && maxDistance && minDistance > maxDistance) throw new Error('NeighborConstraint.minDistance should be less than NeighborConstraint.maxDistance.')

    return null;
};