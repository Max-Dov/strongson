import {Tile} from '../models/tile.model';
import {TileConfig} from '../models/tile-config.model';
import {World} from '../models/world.model';
import {getIsNeighborConstraintSatisfied} from './get-is-neighbor-constraint-satisfied.util';
import {WorldGeometry} from '../constants/world-geometry.model';

/**
 * Returns true if tile config allowed for given coordinate. Allowance is based on neighbors constraints.
 */
export const getIsTileConfigAllowed = <Geometry extends WorldGeometry>(
    config: TileConfig,
    coordinates: Tile<Geometry>['coordinates'],
    world: World<Geometry>,
): boolean =>
    !config.neighbors.some(constraint => !getIsNeighborConstraintSatisfied(constraint, coordinates, world));
