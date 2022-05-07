import {World} from '../models/world.model';
import {Tile} from '../models/tile.model';

const abs = Math.abs;
const sin = Math.sin;
const cos = Math.cos;

/**
 * Random Number Generator - RNG v0.1
 * Generates random number based on world seed, world epoch, tile coordinates and iteration on that tile.
 * @returns number between 0 and 1.
 */
export const rng = (seed: World['seed'], epoch: World['epoch'], coordinates: Tile['coordinates'], iteration = 0) => {
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
