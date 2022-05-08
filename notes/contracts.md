# Contracts between application modules
Contracts are written in TypeScript.

World contracts
=====
```typescript
/**
 * Config that is used by World Compilator to create world or next iteration of world.
 */
export interface WorldConfig {
    /**
     * Unique world ID; e.g. "land-world", "cloud-world".
     */
    id: string;
    /**
     * List of available tiles in the world.
     */
    tiles: Array<TileConfig>;
    /**
     * World tile geometry.
     */
    geometry: WorldGeometry;
}
```

```typescript
/**
 * Actual world.
 */
export interface World<Geometry extends WorldGeometry = WorldGeometry.UNKNOWN> {
    /**
     * Config world is based on.
     */
    configId: WorldConfig['id'];
    /**
     * Unique seed. Used for random generation.
     */
    seed: number;
    /**
     * World iterations number.
     */
    epoch: number;
    /**
     * World geometry. Geometry stands for tile shape. Display format is dependent on geometry.
     */
    geometry: Geometry;
    /**
     * World dimensions.
     * Starting point is [0, 0, ...], then dimensions can be represented as point with maximum values for every dimension.
     */
    dimensions: Tile<Geometry>['coordinates'];
    /**
     * World tiles.
     */
    tiles: Map<TileHash, Tile<Geometry>>;
}
```

```typescript
/**
 * List of supported world geometries. "Geometry" stands for tile shape.
 */
export enum WorldGeometry {
    HEXAGONAL = 'HEXAGONAL',
    TETRAGONAL = 'TETRAGONAL',
    /**
     * When things are really messed up.
     */
    UNKNOWN = 'UNKNOWN',
}
```

```typescript
/**
 * Relation of WorldGeometry to its dimensions (set of coordinates)
 */
export interface GeometryDimensions {
    [WorldGeometry.HEXAGONAL]: [number, number, number]
    [WorldGeometry.TETRAGONAL]: [number, number]
    [WorldGeometry.UNKNOWN]: []
}
```

Tile contracts
=====
```typescript
/**
 * Single tile config.
 */
export interface TileConfig {
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

```typescript
/**
 * Single neighbor constraint description.
 * That model describes exact tile to neighbor tiles relation, not to single neighbor tile.
 */
export interface NeighborConstraint {
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

```typescript
/**
 * Actual tile in world.
 */
export interface Tile<Geometry extends WorldGeometry = WorldGeometry.UNKNOWN> {
    /**
     * Unique tile ID.
     */
    id: TileConfig['id'];
    /**
     * Representation or variant of representation.
     */
    representation: TileConfig['representation'][number]
    /**
     * Tuple of tile coordinates.
     * Dependent on WorldGeometry.
     */
    coordinates: GeometryDimensions[Geometry]
    /**
     * Actual chance to mutate based on neighbor mutationMagnitude and base chanceToMutate.
     */
    chanceToMutate: number;
}
```

```typescript
/**
 * World Tile hash for accessing tile in World['tiles'].
 * Hash is string concat of coordinates. E.g. tile with coordinates === [1, 22, 333] has hash equal to "1,22,333"
 */
export type TileHash = string;
```

Misc
=====

Сигнатура итератора/генератора мира
-----
```typescript
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
-----
```typescript
/**
 * Generates random number based on world seed, world epoch, tile coordinates and iteration on that tile.
 * @returns number between 0 and 1.
 */
type random = (seed: World['seed'], epoch: World['epoch'], coordinates: Tile['coordinates'], iteration: number) => number
```