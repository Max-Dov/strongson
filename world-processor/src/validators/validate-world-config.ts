import {WorldConfig} from '@models/world-config.model';
import {TileShape} from '@constants/tile-shape.enum';
import {validateTileConfig} from '@validators/validate-tile-config';

/**
 * Validates world config and returns true if it's valid or throws an error if not.
 */
export const validateWorldConfig = (worldConfig: unknown): null | never => {
    if (typeof worldConfig !== 'object') throw new Error('WorldConfig should be an object type.');

    const {id, tiles, tileShape} = worldConfig as Partial<WorldConfig>;

    if (typeof id !== 'string') throw new Error('WorldConfig.id field should be string.');
    if (!Array.isArray(tiles)) throw new Error('WorldConfig.tiles should be an array.');
    if (typeof tileShape !== 'string') throw new Error('WorldConfig.tiles tileShape should be string.');
    if (!TileShape[tileShape]) throw new Error('WorldConfig.tileShape should be valid TileShape.');

    tiles.forEach(validateTileConfig);

    return null;
};