import {GenerateWorldBody} from '../endpoints/generate-world.endpoint';

export const validateGenerateWorldBody = (body: unknown) => {
    if (typeof body !== 'object') throw new Error('Request body should be an object type.');

    const {
        epoch,
        seed,
        dimensions,
        worldConfig,
    } = body as Partial<GenerateWorldBody>

    if (!epoch) throw new Error('RequestBody.epoch field is required.');
    if (!seed) throw new Error('RequestBody.seed field is required.');
    if (!dimensions) throw new Error('RequestBody.dimensions field is required.');
    if (!worldConfig) throw new Error('RequestBody.worldConfig field is required.');
}