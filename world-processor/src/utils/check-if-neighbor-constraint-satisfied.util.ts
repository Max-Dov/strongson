/**
 * Returns true if neighbor constraint passes check against coordinate.
 */
import {TileShape} from '@constants/tile-shape.enum';
import {NeighborConstraint} from '@models/neighbor-constraint.model';
import {Tile} from '@models/tile.model';
import {World} from '@models/world.model';
import {getNeighbors} from '@utils/neighbors-extraction/get-neighbors.util';
import {filterTiles} from '@utils/filter-tiles.util';

export const checkIfNeighborConstraintSatisfied = <Shape extends TileShape>(
    constraint: NeighborConstraint,
    coordinates: Tile<Shape>['coordinates'],
    world: World<Shape>,
): boolean => {
    const {neighborConfigId, minAmount, maxAmount, minDistance, maxDistance} = constraint;
    if (!minDistance && !maxDistance) return false; // should not happen, but theoretically possible.
    if (!minAmount && !maxAmount) return false; // should not happen, but theoretically possible.
    /**
     * First, check if there are neighbors closer than allowed.
     */
    if (minDistance) {
        const allNeighbors = getNeighbors(coordinates, world, minDistance);
        const configNeighbors = filterTiles(allNeighbors, neighborConfigId);
        if (configNeighbors.size > 0) {
            return false;
        }
    }
    const allNeighbors = getNeighbors(coordinates, world, maxDistance, minDistance);
    const configNeighbors = filterTiles(allNeighbors, neighborConfigId);
    const neighborsAmount = configNeighbors.size;
    // reversed fail conditions; if any of them succeed, returns false
    return !(maxAmount && neighborsAmount <= maxAmount
        || minAmount && neighborsAmount < minAmount);
};