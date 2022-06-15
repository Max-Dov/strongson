# Proofs of Concepts

This note contains POCs on many challenges on Strongson implementation problems.

Written in TypeScript, some POCs may be outdated due to new version of [contracts](https://github.com/Max-Dov/strongson/blob/main/notes/contracts.md).

## Tile hash
```typescript
/**
 * Generates tile hash from tile coordinates based on tile geometry.
 */
export const getTileHash = (tileCoordinates: Tile<TileShape>['coordinates']): TileHash =>
    tileCoordinates.join(',')
```

## Random Number Generation
```typescript
/**
 * Relation of [seed, epoch, coordinates] tuples to its number of iterations.
 */
const iterationsMap = new Map<string, number>();

/**
 * Generates random number based on world seed, world epoch and tile coordinates.
 * @returns number between 0 and 1.
 */
export const rng = (seed: World['seed'], epoch: World['epoch'], coordinates: Tile<TileShape>['coordinates']) => {
    const stringifiedTuple = [seed, epoch, coordinates.join(',')].join(',');
    let iteration = iterationsMap.get(stringifiedTuple) || 0;
    const rngNumber = rngAlgorithm(seed, epoch, coordinates, iteration);
    iterationsMap.set(stringifiedTuple, iteration + 1);
    return rngNumber;
};

/**
 * Random Number Generator - RNG v0.1
 * Generates random number based on world seed, world epoch, tile coordinates and iteration on that tile.
 * @returns number between 0 and 1.
 */
const rngAlgorithm = (seed: World['seed'], epoch: World['epoch'], coordinates: Tile<TileShape>['coordinates'], iteration = 0) => {
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
```

## Neighbors extraction
```typescript
/**
 * Gets tile neighbors within specified distance.
 * @param coordinates - coordinates of a tile that needs its neighbors to be found.
 * @param world - world with all the tiles.
 * @param distanceMax - maximum distance to a neighbor
 * @param distanceMin - minimum distance to a neighbor
 */
export const getNeighbors = <T extends TileShape = TileShape.UNKNOWN>(
    coordinates: Tile<T>['coordinates'],
    world: World<T>,
    distanceMax: number = 1,
    distanceMin: number = 1,
): World<T>['tiles'] => {
    const neighbors: World<T>['tiles'] = new Map();
    for (let distance = distanceMin; distance <= distanceMax; distance++) {
        const distancedNeighbors = getDistancedNeighbors(coordinates, world, distance);
        for (let [tileHash, neighborTile] of distancedNeighbors) {
            neighbors.set(tileHash, neighborTile);
        }
    }
    return neighbors;
};
```
```typescript
/**
 * Gets neighbors within exact distance.
 * @param coordinates - coordinates of a tile that needs its neighbors to be found.
 * @param world - world with all the tiles.
 * @param distance - distance to a neighbor.
 */
export const getDistancedNeighbors = <T extends TileShape = TileShape.UNKNOWN>(
        coordinates: Tile<T>['coordinates'],
        world: World<T>,
        distance: number,
    ): World<T>['tiles'] => {
        if (distance === 0) {
            const result = new Map<TileHash, Tile<T>>();
            const originTileHash = getTileHash(coordinates);
            const originTile = world.tiles.get(originTileHash);
            if (originTile) {
                result.set(originTileHash, originTile);
            }
            return result;
        }
        switch (world.tileShape) {
            case TileShape.HEXAGONAL:
                return getHexagonalDistancedNeighbors(
                    coordinates as Tile<TileShape.HEXAGONAL>['coordinates'],
                    world as World<TileShape.HEXAGONAL>,
                    distance,
                ) as World<T>['tiles'];
            case TileShape.TETRAGONAL:
            case TileShape.UNKNOWN:
            default:
                return new Map<TileHash, Tile<T>>();
        }
    };

/**
 * Gets distanced neighbors placed on "WorldGeometry.HEXAGONAL" grid.
 * @param coordinates - coordinates of a tile that needs its neighbors to be found.
 * @param world - world with all the tiles.
 * @param distance - distance to a neighbor.
 */
export const getHexagonalDistancedNeighbors = (
    coordinates: Tile<TileShape.HEXAGONAL>['coordinates'],
    world: World<TileShape.HEXAGONAL>,
    distance: number,
): World<TileShape.HEXAGONAL>['tiles'] => {
    const [originX, originY, originZ] = coordinates;
    const neighborsCoordinates = new Array<Tile<TileShape.HEXAGONAL>['coordinates']>();
    for (let shift = 0; shift < distance; shift++) {
        neighborsCoordinates.push([originX + distance, originY, originZ + shift]);
        neighborsCoordinates.push([originX - distance, originY, originZ - shift]);
        neighborsCoordinates.push([originX - shift, originY - distance, originZ]);
        neighborsCoordinates.push([originX + shift, originY + distance, originZ]);
        neighborsCoordinates.push([originX, originY + shift, originZ + distance]);
        neighborsCoordinates.push([originX, originY - shift, originZ - distance]);
    }
    const neighborTiles = new Map<TileHash, Tile<TileShape.HEXAGONAL>>();
    neighborsCoordinates.forEach(coordinates => {
        const neighborTileHash = getTileHash(coordinates);
        const neighborTile = world.tiles.get(neighborTileHash);
        if (neighborTile) {
            neighborTiles.set(neighborTileHash, neighborTile);
        }
    });
    return neighborTiles;
};
```

```typescript
/**
 * Filters tiles by tileId.
 */
export const filterTiles = (tiles: World['tiles'], tileId: Tile['configId']): World['tiles'] => {
    const result: World['tiles'] = new Map()
    for (const [hash, tile] of tiles) {
        if (tile.configId === tileId) {
            result.set(hash, tile)
        }
    }
    return result
}
```