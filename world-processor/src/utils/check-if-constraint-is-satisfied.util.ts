import {TileShape} from '@constants/tile-shape.enum';
import {NeighborConstraint} from '@models/neighbor-constraint.model';
import {Tile} from '@models/tile.model';
import {World} from '@models/world.model';
import {getNeighbors} from '@utils/neighbors-extraction/get-neighbors.util';
import {filterTilesByConfigId} from '@utils/filter-tiles-by-config-id.util';
import {checkIfConstraintIsValid} from '@utils/check-if-constraint-is-valid.util';

/**
 * Returns true if neighbor constraint passes check against coordinate.
 */
export const checkIfConstraintIsSatisfied = <Shape extends TileShape>(
    constraint: NeighborConstraint,
    coordinates: Tile<Shape>['coordinates'],
    world: World<Shape>,
): boolean => {
    const {neighborConfigId, minAmount, maxAmount, minDistance, maxDistance} = constraint;

    // TODO move that to validators.
    if (!checkIfConstraintIsValid(constraint)) return false;

    /**
     * First, check if there are neighbors closer than allowed.
     */
    if (minDistance) {
        const possibleTrespassers = getNeighbors(coordinates, world, minDistance);
        const trespassers = filterTilesByConfigId(possibleTrespassers, neighborConfigId);
        if (trespassers.size > 0) {
            return false;
        }
    }
    const allNeighbors = getNeighbors(coordinates, world, maxDistance, minDistance);
    const constraintNeighbors = filterTilesByConfigId(allNeighbors, neighborConfigId);
    const neighborsAmount = constraintNeighbors.size;
    const isSatisfied =
        neighborsAmount <= (maxAmount as number)
        && (!minAmount || neighborsAmount <= minAmount);
    return isSatisfied;
};
