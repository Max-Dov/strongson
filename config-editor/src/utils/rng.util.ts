import {World} from '../models/world.model';
import {Tile} from '../models/tile.model';
import {WorldGeometry} from '../constants/world-geometry.model';

const abs = Math.abs;
const sin = Math.sin;
const cos = Math.cos;

/**
 * Relation of [seed, epoch, coordinates] tuples to its number of iterations.
 */
const iterationsMap = new Map<string, number>();

/**
 * Generates random number based on world seed, world epoch and tile coordinates.
 * @returns number between 0 and 1.
 */
export const rng = (seed: World['seed'], epoch: World['epoch'], coordinates: Tile<WorldGeometry>['coordinates']) => {
    const stringifiedTuple = [seed, epoch, coordinates.join(',')].join(',');
    let iteration = iterationsMap.get(stringifiedTuple) || 0;
    const rngNumber = rngAlgorithm(seed, epoch, coordinates, iteration);
    iterationsMap.set(stringifiedTuple, iteration + 1);
    return rngNumber;
};

/**
 * Generates random integer based on world seed, world epoch and tile coordinates.
 * @returns random integer less than @param multiplier.
 */
export const rngNumber = (seed: World['seed'], epoch: World['epoch'], coordinates: Tile<WorldGeometry>['coordinates'], multiplier: number) =>
    Math.trunc(multiplier * rng(seed, epoch, coordinates))

/**
 * Random Number Generator - RNG v0.1
 * Generates random number based on world seed, world epoch, tile coordinates and iteration on that tile.
 * @returns number between 0 and 1.
 */
const rngAlgorithm = (seed: World['seed'], epoch: World['epoch'], coordinates: Tile<WorldGeometry>['coordinates'], iteration = 0) => {
    const seedMix = abs(cos(seed));
    const epochMix = abs(sin(epoch));
    const coordinatesMix = abs(cos(Number(coordinates.join('17'))));
    const iterationMix = abs(sin(iteration));
    const shaking = String(seedMix + epochMix + coordinatesMix + iterationMix);
    let reverse = '0.';
    // "length - 2" is needed because "length - 1" digit happens to be very predictable, making distribution uneven
    for (let i = shaking.length - 2; i >= 2; i--) {
        reverse += shaking[i];
    }
    return Number(reverse);
};
