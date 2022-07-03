import {NeighborConstraint} from '@models/neighbor-constraint.model';

/**
 * Returns true if constraint is valid - constraint fields make sense.
 */
export const checkIfConstraintIsValid = (constraint: NeighborConstraint): boolean => {
    const {minAmount, maxAmount, minDistance, maxDistance} = constraint;

    /**
     * If no maxDistance specified, that means max distance parameter refers to the whole world as if
     * maxDistance was infinite. That is n^2 (n - amount of tiles in world) checks for every tile against all
     * tiles in world which is very slow and cannot be afforded for now.
     */
    if (!maxDistance) return false;

    /**
     * If min distance is specified, but it's greater than max distance, then it contradicts common sense.
     * Maybe there's a practical problem when that convention would make sense, but not for now.
     */
    if (minDistance && minDistance > maxDistance) return false;

    /**
     * If both of these fields are empty, then constraint should not exist, yet there it is.
     */
    if (!maxAmount && maxAmount !== 0 && !minAmount && minAmount !== 0) return false;

    /**
     * If both of these fields are empty, then constraint should not exist, yet there it is.
     */
    if (!minDistance && !maxDistance) return false;

    return true;
}