# Contracts between application modules written in TypeScript.

Конфиг тайла-соседа
------
```
/**
 * Single neighbor constraint description.
 * That model describes exact tile to neighbor tiles relation, not to single neighbor tile.
 */
interface NeighborConstraint {
    /**
     * Tile ID that has neighbors; e.g. "land-grass"
     */
    id: TileConfig['id'];
    /**
     * Reference to tile by ID; e.g. "castle-lvl1"
     */
    neighborId: TileConfig['id'];
    /**
     * Minimum amount of neighbor tiles.
     */
    minAmount?: number;
    /**
     * Maximum amount of neighbor tiles.
     */
    maxAmount?: number;
    /**
     * Minimum distance to a neighbor tiles.
     */
    minimumDistance?: number;
    /**
     * Maximum distance to a neighbor tiles.
     */
    maximumDistance?: number;
}
```

Конфиг конкретного тайла
-----
```
/**
 * Single tile config.
 */
interface TileConfig {
    /**
     * Unique tile ID; e.g. "castle-lvl1"
     */
    id: string;
    /**
     * Name to represent to player; e.g. "Castle lvl 1"
     */
    displayName: string;
    /**
     * List of neighbor constraints.
     */
    neighbors: Array<NeighborConstraint>;
    /**
     * Representation dependent on game implementation.
     * Can be picture address e.g. "land_grass_tile.png" or ID for picture from DB "land_grass_tile".
     * Or can be different variants, which are represented as array.
     */
    representation: string | Array<string>;
    /**
     * Base chance to mutate into a neighbor. Dimension is %. E.g. "15" stands for "15%".
     */
    chanceToMutate: number;
    /**
     * Factor to count when tile needs to mutate into other tile.
     *
     * For example, when some tile actually have to mutate, it will roll a random number and then pick neighboring tile.
     * Neighboring tiles with greater mutationWeight will have greater chance to be mutated into.
     */
    mutationWeight: number;
    /**
     * Multiplier effect on neighbor tiles that affects their chanceToMutate.
     */
    mutationMagnitude: number;
    /**
     * Radius of multiplier effect on neighbor tiles that affects their chanceToMutate.
     */
    mutationMagnitudeRadius: number;
}
```

Конфиг Мира
-------
```
/**
 * Config that is used by World Compilator to create world or next iteration of world.
 */
interface WorldConfig {
    /**
     * Unique world ID; e.g. "land-world", "cloud-world".
     */
    id: string;
    /**
     * List of available tiles in the world.
     */
    tiles: Set<TileConfig>;
}
```

Конкретный тайл в мире
--------
```
/**
 * Actual tile in world.
 */
interface Tile {
    /**
     * Unique tile ID.
     */
    id: TileConfig['id'];
    /**
     * Representation or variant of representation.
     */
    representation: TileConfig['representation'] | TileConfig['representation'][number]
    /**
     * Tuple of X and Y coordinates.
     */
    coordinates: [number, number];
    /**
     * Actual chance to mutate based on neighbor mutationMagnitude and base changeToMutate.
     */
    chanceToMutate: number;
}
```

Конкретный мир
-------
```
/**
 * Actual world.
 */
interface World {
    /**
     * Config world is based on.
     */
    configId: WorldConfig['id'];
    /**
     * Unique world seed. Used for random generation.
     */
    seed: number;
    /**
     * World number of iteration. Worlds should start with 0 as starting point.
     */
    epoch: number;
    /**
     * X and Y dimensions of world.
     * Note: would be changed when "chanks" would be implemented;
     */
    dimensions: [number, number];
    /**
     * World tiles.
     */
    tiles: Array<Tile>;
}
```

Сигнатура итератора/генератора мира
-----------
```
/**
 * Generates next world iteration based on worldConfig.
 * If world is not specified, should create first world iteration based on it's seed. World epoch would be 0.
 * @param worldConfig - config to use for world generation.
 * @param world - actual world to iterate.
 * @returns next or first world iteration
 */
type iterateWorld = (worldConfig: WorldConfig, world?: World) => World
```

Сигнатура функции генерации псевдо-случайного числа
-----------
```
/**
 * Generates number based on world seed, world epoch, tile coordinates and iteration on given tile.
 * @returns number between 0 and 1.
 */
type random = (seed: World['seed'], epoch: World['epoch'], coordinates: Tile['coordinates'], iteration: number) => number
```