import {NeighborConstraint} from '../models/neighbor-constraint.model';
import {Tile} from '../models/tile.model';
import {World} from '../models/world.model';
import {getNeighbors} from './neighbors-extraction/get-neighbors.util';
import {filterTiles} from './neighbors-extraction/filter-neighbors.util';
import {WorldGeometry} from '../constants/world-geometry.model';

/**
 * Returns true if neighbor constraint passes check against coordinate.
 */
export const getIsNeighborConstraintSatisfied = <Geometry extends WorldGeometry>(
    constraint: NeighborConstraint,
    coordinates: Tile<Geometry>['coordinates'],
    world: World<Geometry>,
): boolean => {
    const {neighborId, minAmount, maxAmount, minimumDistance, maximumDistance} = constraint;
    if (!minimumDistance && !maximumDistance) return false; // should not happen, but theoretically possible.
    if (!minAmount && !maxAmount) return false; // should not happen, but theoretically possible.
    /**
     * First, check if there are neighbors closer than allowed.
     */
    if (minimumDistance) {
        const allNeighbors = getNeighbors(coordinates, world, minimumDistance);
        const configNeighbors = filterTiles(allNeighbors, neighborId);
        if (configNeighbors.size > 0) {
            return false;
        }
    }
    const allNeighbors = getNeighbors(coordinates, world, maximumDistance, minimumDistance);
    const configNeighbors = filterTiles(allNeighbors, neighborId);
    const neighborsAmount = configNeighbors.size;
    // reversed fail conditions; if any of them succeed, returns false
    return !(maxAmount && neighborsAmount <= maxAmount
        || minAmount && neighborsAmount < minAmount);
};