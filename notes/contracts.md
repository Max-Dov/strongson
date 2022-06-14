# Contracts <sup>v3</sup>

Contracts between Strongson modules. Contracts are written in TypeScript.

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
    tileShape: TileShape;
}
```

```typescript
/**
 * Actual world.
 */
export interface World<Shape extends TileShape = TileShape.UNKNOWN> {
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
    tileShape: Shape;
    /**
     * World dimensions.
     * Starting point is [0, 0, ...], then dimensions can be represented as point with maximum values for every dimension.
     */
    dimensions: Tile<Shape>['coordinates'];
    /**
     * World tiles.
     */
    tiles: Map<TileHash, Tile<Shape>>;
}
```

```typescript
/**
 * List of supported tile shapes.
 */
export enum TileShape {
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
 * Relation of TileShape to its dimensions (set of coordinates).
 * Order of dimensions: X, Y, Z. Orientation of axes is counterclock-wise.
 */
export interface ShapeDimensions {
    [TileShape.HEXAGONAL]: [number, number, number]
    [TileShape.TETRAGONAL]: [number, number]
    [TileShape.UNKNOWN]: []
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
     * List of neighbor constraints.
     */
    neighbors: Array<NeighborConstraint>;
    /**
     * List of possible tile representations ids.
     */
    representationsIds: Array<TileRepresentation['id']>
    /**
     * Factor to count when tile needs to mutate into another tile.
     *
     * For example, when tile must mutate, it will roll a random number and then pick new tile.
     * New tiles with greater mutationWeight will have greater chance to be mutated into.
     */
    mutationWeight: number;
    /**
     * Base chance to mutate into another tile. Dimension is %. E.g. "15" stands for "15%".
     */
    mutationChance: number;
    /**
     * Factor to count when tile needs to mutate into another tile.
     *
     * For example, when tile must mutate, it will roll a random number and then pick new tile.
     * New tiles with greater number around current coordinate will have greater change to be mutated into.
     */
    crowdWeightMultiplier?: number;
    /**
     * Radius of crowd weight multiplier effect.
     */
    crowdWeightMultiplierRadius?: number;
    /**
     * Minimum amount of epoch cycles when tile may exist.
     */
    minAge?: number;
    /**
     * Maximum amount of epoch cycles when tile may exist.
     */
    maxAge?: number;
    /**
     * Multiplier on neighbor tiles that affects their mutationChance.
     */
    neighborsMutationMultiplier?: number;
    /**
     * Radius of multiplier on neighbor tiles that affects their mutationChance.
     */
    neighborsMutationMultiplierRadius?: number;
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
    configId: TileConfig['id'];
    /**
     * Reference to tile by ID; e.g. "castle-lvl1"
     */
    neighborConfigId: TileConfig['id'];
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
    minDistance?: number;
    /**
     * Maximum distance to a neighbor tiles.
     */
    maxDistance?: number;
}
```

```typescript
/**
 * Representation fields of Tile in World. All fields are related to information shown in game UI or game GUI.
 */
export interface TileRepresentation {
    /**
     * Representation ID; e.g. "castle-lvl1-variant-1"
     * Same tile config may have different representation variants for entertainment purposes.
     */
    id: string;
    /**
     * Tile ID, e.g. "castle-lvl1"
     */
    configId: TileConfig['id'];
    /**
     * Name to represent to player; e.g. "Castle lvl 1"
     */
    displayName: string;
    /**
     * Picture address URL; e.g. "land_grass_tile.png".
     */
    pictureUrl: string;
    /**
     * Tile description.
     */
    description: string;
}
```

```typescript
/**
 * Actual tile in world.
 */
export interface Tile<Shape extends TileShape = TileShape.UNKNOWN> {
    /**
     * Tile Config ID.
     */
    configId: TileConfig['id'];
    /**
     * Variant of representation.
     */
    representationId: TileRepresentation['id'];
    /**
     * Tuple of tile coordinates.
     * Dependent on Shape.
     */
    coordinates: ShapeDimensions[Shape];
    /**
     * Actual chance to mutate based on neighbor mutationMagnitude and base chanceToMutate.
     */
    chanceToMutate: number;
    /**
     * World['epoch'] when tile started existing.
     */
    birthEpoch: number;
}
```

```typescript
/**
 * Tile hash for accessing tile in World['tiles'].
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