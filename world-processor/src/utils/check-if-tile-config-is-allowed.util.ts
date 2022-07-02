import {TileConfig} from '@models/tile-config.model';
import {Tile} from '@models/tile.model';
import {World} from '@models/world.model';
import {TileShape} from '@constants/tile-shape.enum';
import {checkIfConstraintIsSatisfied} from '@utils/check-if-constraint-is-satisfied.util';

/**
 * Returns true if tile config can be applied to given coordinate. Acceptance is based on neighbors constraints.
 */
export const checkIfTileConfigIsAllowed = <Shape extends TileShape>(
    config: TileConfig,
    coordinates: Tile<Shape>['coordinates'],
    world: World<Shape>,
): boolean =>
    !config.neighbors.some(constraint => !checkIfConstraintIsSatisfied(constraint, coordinates, world));