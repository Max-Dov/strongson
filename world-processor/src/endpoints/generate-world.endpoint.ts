import {Logger} from '@utils/logger.util';
import {EndpointInfo} from '@models/endpoint-info.model';
import {validateGenerateWorldBody} from '@validators/validate-generate-world-body';
import {Endpoints} from '@constants/endpoints.enum';
import chalk from 'chalk';
import {generateWorld} from '../generate-world';
import {World} from '@models/world.model';
import {WorldConfig} from '@models/world-config.model';
import {TileShape} from '@constants/tile-shape.enum';

export interface GenerateWorldBody {
    epoch: World<TileShape>['epoch'];
    seed: World<TileShape>['seed'];
    dimensions: World<TileShape>['dimensions'];
    worldConfig: WorldConfig;
}

export const generateWorldEndpoint: EndpointInfo = [
    Endpoints.GENERATE_WORLD,
    (request, result) => {
        Logger.action('/generate-world');
        const body: GenerateWorldBody = request.body;

        try {
            validateGenerateWorldBody(body);
        } catch (error) {
            const errorMessage = (error as Error).message;
            Logger.error(
                `Validation error during ${chalk.bold(Endpoints.GENERATE_WORLD)}.`,
                errorMessage,
            );
            result.status(422);
            result.send(errorMessage);
            return;
        }

        try {
            const world = generateWorld(body.epoch, body.seed, body.dimensions, body.worldConfig);
            result.status(200);
            result.send(world);
        } catch (e) {
            Logger.error('Runtime error during world generation. That is sad.', (e as Error).stack);
            result.status(500)
            result.send('World was not created due to unexpected code error. Try different params.')
        }
    },
];