import {World} from '@models/world.model';
import {WorldConfig} from '@models/world-config.model';
import {TileShape} from '@constants/tile-shape.enum';
import {TileHash} from '@models/tile-hash.model';
import {Tile} from '@models/tile.model';
import {Logger} from '@utils/logger.util';
import {getTileHash} from '@utils/get-tile-hash.util';
import {generateRandomTile} from '@utils/generate-random-tile.util';
import {applyTileMultipliers} from '@utils/apply-tile-multipliers.util';
import {resetRng, rngInteger} from '@utils/rng.utils';
import {ShapeDimensions} from '@models/shape-dimensions.model';

// TODO store tiles in object not map to omit serialization step.

export const generateWorld = <Shape extends TileShape>(
    epoch: World['epoch'],
    seed: World['seed'],
    dimensions: World<Shape>['dimensions'],
    worldConfig: WorldConfig,
): World<Shape> => {
    resetRng();
    const tileShape = worldConfig.tileShape as Shape;
    const configId = worldConfig.id;
    const world: World<Shape> = {
        epoch,
        seed,
        dimensions,
        tileShape,
        configId,
        tiles: {},
    };
    Logger.info('Generating world', {configId, tileShape, dimensions, seed, epoch});
    if (tileShape === TileShape.HEXAGONAL) {
        world.tiles = generateHexagonalTiles(
            worldConfig,
            world as World<TileShape.HEXAGONAL>,
            epoch,
            seed,
            dimensions as World<TileShape.HEXAGONAL>['dimensions'],
        ) as World<Shape>['tiles'];
    } else {
        Logger.warning('Can not generate tiles for world with any tile shape but HEXAGONAL.');
        return world;
    }
    Logger.info('Number of tiles in world:', Object.keys(world.tiles).length);
    Logger.goodInfo('World successfully generated!');
    return world;
};

const generateHexagonalTiles = (
    worldConfig: WorldConfig,
    world: World<TileShape.HEXAGONAL>,
    epoch: World<TileShape.HEXAGONAL>['epoch'],
    seed: World<TileShape.HEXAGONAL>['seed'],
    dimensions: World<TileShape.HEXAGONAL>['dimensions'],
): World<TileShape.HEXAGONAL>['tiles'] => {
    const tiles: {
        /**
         * Partial world tiles. "tile.coordinates" field is generated for all tiles,
         * then actual tiles are generated and merged with coordinates.
         *
         * Note: it is done that way so when neighbors are checked there's a distinct difference between coordinates
         * associated with "tile that is not created yet" and "out of world coordinate". Tiles that are not yet created should have
         * their crowd/mutation multipliers affected during neighbors creation.
         */
        [key in TileHash]: Partial<Tile<TileShape.HEXAGONAL>>
    } = {};

    Logger.info('Generating HEX coordinates', {dimensions});
    const coordinates = generateHexagonalCoordinates(dimensions) as Array<ShapeDimensions[TileShape.HEXAGONAL]>;

    /**
     * Shuffled coordinates allow more natural world generation due to iterating over random dots on map.
     * If tiles are generated via spiral around [0,0,0], then some tiles with high grouping parameters will stretch
     * across spiral.
     */
    Logger.info('Shuffling coordinates');
    shuffleArray(coordinates, seed, epoch, [0, 0, 0]);

    Logger.info('Mapping coordinates to tiles');
    coordinates.forEach(coordinate => tiles[getTileHash(coordinate, TileShape.HEXAGONAL)] = {coordinates: coordinate});

    /**
     * World tiles would be used for multipliers application and neighbors constraints checks.
     * So it is safe to set them in world already.
     * Other fields would be filled by iteration through coordinates down below.
     */
    world.tiles = tiles as World<TileShape.HEXAGONAL>['tiles'];

    Logger.info('Generating tiles');
    const tileShape = world.tileShape;
    const tilesAmount: { [key in Tile['configId']]: number } = {};
    coordinates.forEach(coordinate => {
        // generate tile
        const newTile = generateRandomTile<TileShape.HEXAGONAL>(
            coordinate,
            worldConfig.tiles,
            world,
        );
        // set tile in world
        tiles[getTileHash(newTile.coordinates, tileShape)] = newTile;

        // apply tiles' tileConfig multipliers to neighbors
        applyTileMultipliers(newTile, world, worldConfig);

        // tracking tiles amount
        const configId = newTile.configId;
        tilesAmount[configId] = (tilesAmount[configId] || 0) + 1;
    });

    Logger.goodInfo('Tiles generated:', tilesAmount);
    return tiles as World<TileShape.HEXAGONAL>['tiles'];
};

const generateHexagonalCoordinates = (dimensions: World<TileShape.HEXAGONAL>['dimensions']): [number, number, number][] => {
    const [xMax, yMax, zMax] = dimensions;
    const coordinates: [number, number, number][] = [[0, 0, 0]];
    /**
     * Tiles along X axis, left and right "triangle of tiles" touching X axis.
     * And tiles on Z axis.
     */
    for (let z = 1; z < zMax; z++) {
        coordinates.push([0, 0, z]);
        for (let y = 1; y < yMax; y++)
            coordinates.push([0, y, z]);
    }

    /**
     * Tiles along Y axis, left and right "triangle of tiles" touching Y axis.
     * And tiles on X axis.
     */
    for (let x = 1; x < xMax; x++) {
        coordinates.push([x, 0, 0]);
        for (let z = 1; z < zMax; z++)
            coordinates.push([x, 0, z]);
    }

    /**
     * Tiles along Z axis, left and right "triangle of tiles" touching Z axis.
     * And tiles on Y axis.
     */
    for (let y = 1; y < yMax; y++) {
        coordinates.push([0, y, 0]);
        for (let x = 1; x < xMax; x++)
            coordinates.push([x, y, 0]);
    }
    return coordinates;
};

const shuffleArray = (array: Array<unknown>, seed: World['seed'], epoch: World['epoch'], coordinates: Tile<TileShape>['coordinates']) => {
    for (let i = 0; i < array.length - 1; i++) {
        const newPosition = rngInteger(seed, epoch, coordinates, i + 1);
        [array[i], array[newPosition]] = [array[newPosition], array[i]];
    }
};