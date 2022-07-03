import {WorldConfig} from '@models/world-config.model';
import {TileShape} from '@constants/tile-shape.enum';
import {validateTileConfig} from '@validators/validate-tile-config';

/**
 * Validates world config and returns true if it's valid or throws an error if not.
 */
export const validateWorldConfig = (worldConfig: unknown): null | never => {
    if (typeof worldConfig !== 'object') throw new Error('WorldConfig should be an object type.');

    const {id, tiles, tileShape} = worldConfig as Partial<WorldConfig>;

    if (!id) throw new Error('WorldConfig.id field is required.');
    if (!tiles) throw new Error('WorldConfig.tiles field is required.');
    if (!tileShape) throw new Error('WorldConfig.tiles tileShape is required.');
    if (!TileShape[tileShape]) throw new Error('WorldConfig.tileShape is not valid TileShape.');

    tiles.forEach(validateTileConfig);

    return null;
};