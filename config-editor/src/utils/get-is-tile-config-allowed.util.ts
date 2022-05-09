import {Tile} from '../models/tile.model';
import {TileConfig} from '../models/tile-config.model';
import {World} from '../models/world.model';
import {getIsNeighborConstraintSatisfied} from './get-is-neighbor-constraint-satisfied.util';

/**
 * Returns true if tile config allowed for given coordinate. Allowance is based on neighbors constraints.
 */
export const getIsTileConfigAllowed = (config: TileConfig, coordinates: Tile['coordinates'], world: World) =>
    !config.neighbors.some(constraint => !getIsNeighborConstraintSatisfied(constraint, coordinates, world))
