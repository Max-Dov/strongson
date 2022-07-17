import {GenerateWorldBody} from '../endpoints/generate-world.endpoint';
import {validateWorldConfig} from '@validators/validate-world-config';
import {TileShape} from '@constants/tile-shape.enum';

export const validateGenerateWorldBody = (body: unknown) => {
    if (typeof body !== 'object') throw new Error('Request body should be an object type.');

    const {
        epoch,
        seed,
        dimensions,
        worldConfig,
    } = body as Partial<GenerateWorldBody>;

    /**
     * Required fields checks.
     */
    if (typeof epoch !== 'number') throw new Error('RequestBody.epoch should be a number.');
    if (typeof seed !== 'number') throw new Error('RequestBody.seed should be a number.');
    if (!Array.isArray(dimensions)) throw new Error('RequestBody.dimensions should be an array.');
    if (typeof worldConfig !== 'object') throw new Error('RequestBody.worldConfig field should be an object.');

    /**
     * Common sense checks.
     */
    if (dimensions.some(dimension => dimension % 1 !== 0))
        throw new Error('RequestBody.dimensions should contain only positive integers (float numbers are not allowed).');
    if (dimensions.some(dimension => dimension < 0))
        throw new Error('RequestBody.dimensions should contain only positive integers.');
    if (worldConfig.tileShape === TileShape.HEXAGONAL && dimensions.length !== 3)
        throw new Error('RequestBody.dimensions should have 3 integers for HEXAGONAL geometry');
    if (worldConfig.tileShape === TileShape.TETRAGONAL && dimensions.length !== 2)
        throw new Error('RequestBody.dimensions should have 2 integers for HEXAGONAL geometry');

    validateWorldConfig(worldConfig);
};