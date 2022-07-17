# Contracts <sup>v5</sup>

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
     * World tile shape. Distance between tiles and world display is dependent on what shape tiles have.
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
 * Tile config describing "behavior" properties of Tile in World.
 *
 * Notes:
 * - "Tile mutation" means changing "configId" for Tile in World.
 * - When tile mutates, when new tile config is selected, multipliers are immediately applied to neighboring tiles.
 */
export interface TileConfig {
    /**
     * Unique tile ID; e.g. "castle-lvl1".
     */
    id: string;
    /**
     * List of tile representations IDs.
     *
     * Representation contains display info about tile and is dependent on game implementation.
     * But server doing calculations refers to representation by ID, allowing representation to be as flexible
     * as frontend needs.
     */
    representationsIds: Array<TileRepresentation['id']>;
    /**
     * List of neighbor constraints. Tile can exist only if all it's constraints are satisfied.
     *
     * E.g.: if "Mountain" tile needs at least 5 "Hills" tiles around it,
     * then that would be declared as neighbor constraint from "Hills", with prop "minAmount" equal to 5.
     */
    neighbors: Array<NeighborConstraint>;
    /**
     * Base chance to mutate into another tile. May be affected by neighboring tiles.
     *
     * Tile can not mutate into itself, e.g.: "Forest" tile can not mutate into "Forest" tile, technically
     * remaining same tile with reset "birthEpoch".
     *
     * Dimension is percents (%). E.g. "15" stands for "15%".
     */
    mutationChance: number;
    /**
     * Mutation chance multiplier to apply to NEIGHBORING tiles around current tile.
     *
     * If neighboring tiles need to be forced to mutate or have their mutation chance decreased, then that parameter
     * can be adjusted.
     * Mutation chance multiplier does not affect origin tile.
     *
     * Dimension is "positive number" that would be multiplied with "percents (%)" units.
     */
    mutationChanceMultiplier?: number;
    /**
     * Radius of mutation chance multiplier.
     *
     * Every tile within multiplier radius will have its mutationChance multiplied by mutationChanceMultiplier.
     *
     * Dimension is "tiles" which represents max amount of tiles between origin tile and target tile.
     */
    mutationChanceMultiplierRadius?: number;
    /**
     * Base mutation weight of tile config among other "competing" tile configs.
     *
     * May be affected by same tiles in proximity (same in terms of tiles with same "configId").
     * When tile rolls "mutationChance" parameter and has to mutate into another tile, it will choose random
     * tile config, yet tile config chance to be picked is proportional to it's "weight" represented by mutationWeight.
     *
     * Dimension is "positive number".
     */
    mutationWeight: number;
    /**
     * Mutation weight multiplier to apply to SAME* tiles around current tile.
     *
     * SAME tiles are tiles with same "configId".
     * That parameter is used for grouping tiles. For example, "Forest" tiles are expected to be grouped, so
     * mutationWeightMultiplier can be adjusted to be number 2, for example. 6 "Forest" tiles on hexagonal grid will
     * increase mutationWeight of tile in between these 6 tiles by 2^6 or 64 times, thus greatly increasing chance to be
     * chosen over other possible tile configs.
     */
    mutationWeightMultiplier?: number;
    /**
     * Radius of mutation weight multiplier.
     *
     * Tiles with same "configId" within multiplier radius will have its mutationWeight multiplied by
     * mutationWeightMultiplier.
     *
     * Dimension is "tiles" which represents max amount of tiles between origin tile and target tile.
     */
    mutationWeightMultiplierRadius?: number;
    /**
     * Minimum amount of epoch cycles when tile will exist no matter what mutation chance is.
     */
    minAge?: number;
    /**
     * Maximum amount of epoch cycles when tile may exist.
     *
     * It may mutate before that value, but once maxAge is stepped over, tile will mutate.
     */
    maxAge?: number;
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
    displayName: ReactNode;
    /**
     * Picture address URL; e.g. "land_grass_tile.png".
     */
    pictureUrl: string;
    /**
     * Tile description.
     */
    description: ReactNode;
}
```

```typescript
/**
 * Actual tile in world.
 *
 * Notes:
 * - "configId" changes every time "mutationChance" procs on every world iteration.
 * - "representationId" and "birthEpoch" change with every change of "configId"
 * - "coordinates" are not expected to be changed after initialization, but it's up to game implementation how to handle them.
 * - "mutationChance" and "mutationWeightMultipliers" are expected to be revised on every world iteration.
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
     * Actual chance to mutate, already affected by multipliers.
     *
     * For more info on chance multipliers, check TileConfig.mutationChanceMultiplier.
     */
    mutationChance: number;
    /**
     * Weight multipliers from neighboring tiles.
     *
     * Check TileConfig.mutationWeightMultiplier for more info.
     */
    mutationWeightMultipliers: {
        [key in TileConfig['id']]: number;
    };
    /**
     * World['epoch'] when tile last mutated into current form.
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

World iterator function signature
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

Pseudo-random number generation function signature
-----
```typescript
/**
 * Generates random number based on world seed, world epoch, tile coordinates and iteration on that tile.
 * @returns number between 0 and 1.
 */
type random = (seed: World['seed'], epoch: World['epoch'], coordinates: Tile['coordinates'], iteration: number) => number
```
