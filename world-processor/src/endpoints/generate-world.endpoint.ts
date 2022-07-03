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
    epoch: World['epoch'];
    seed: World['seed'];
    dimensions: World['dimensions'];
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

        result.status(200);
        const world = generateWorld(body.epoch, body.seed, body.dimensions, body.worldConfig);
        result.send(serializeWorld(world));
    },
];

const serializeWorld = (world: World<TileShape>): any =>
    ({
        ...world,
        tiles: [...world.tiles.values()],
    });