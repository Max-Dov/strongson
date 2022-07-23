import {WorldConfig} from '@models/world-config.model';
import {Tooltip} from '@shared/tooltip/tooltip.component';
import React, {ReactNode} from 'react';
import './tiles-table-editor.styles.scss';
import {TileConfig} from '@models/tile-config.model';
import {Input} from '@shared/input/input.component';
import {AddHexagonButton} from '@svgs/add-hexagon-button.svg';

type Tile = Partial<WorldConfig['tiles'][number]>
type Tiles = Array<Tile>

interface TilesTableEditorProps {
    /**
     * Tiles to edit.
     */
    tiles?: Tiles;
    /**
     * Callback to call once tiles are updated.
     */
    setTiles: (newTiles: Tiles) => void;
}

/**
 * World's tiles editor represented as table.
 * Some fields (representations Ids, neighbors constraints) are hidden during table view.
 */
export const TilesTableEditor = ({tiles, setTiles}: TilesTableEditorProps) => {
    const renderTileEditorRow = (tile: TileConfig, index: number): ReactNode => {
        return <TileEditorRow tileConfig={tile} updateTileConfig={() => {
        }}/>;
    };

    return <section className="tiles-editor">
        <h3>
            <strong>World Tiles</strong>
            <Tooltip>Tiles that can exist in World.</Tooltip>
        </h3>
        <table className="tiles-table">
            <HeaderRow/>
            <tbody>
            {tiles?.map(renderTileEditorRow)}
            <tr>
                <td colSpan={9}>
                    <AddHexagonButton className="add-tile-config-row">: Add Tile</AddHexagonButton>
                </td>
            </tr>
            </tbody>
        </table>
    </section>;
};

const HeaderRow = () => (
    <thead>
    <tr>
        <th>
            <div className="header-cell">
                <span>ID</span>
                <Tooltip>Unique tile ID; e.g. "castle-lvl1".</Tooltip>
            </div>
        </th>
        <th>
            <div className="header-cell">
                <span>Mutation chance</span>
                <Tooltip>
                    Base chance to mutate into another tile. May be affected by neighboring tiles.<br/><br/>
                    Tile can not mutate into itself, e.g.: "Forest" tile can not mutate into "Forest" tile,
                    technically remaining same tile with reset "birthEpoch".<br/>
                    Dimension is percents (%). E.g. "15" stands for "15%".
                </Tooltip>
            </div>
        </th>
        <th>
            <div className="header-cell">
                Mutation chance multiplier
                <Tooltip>
                    Mutation chance multiplier to apply to NEIGHBORING tiles around current tile.<br/><br/>
                    If neighboring tiles need to be forced to mutate or have their mutation chance decreased, <br/>
                    then that parameter can be adjusted.<br/>
                    Mutation chance multiplier does not affect origin tile.<br/>
                    Dimension is "positive number" that would be multiplied with "percents (%)" units.
                </Tooltip>
            </div>
        </th>
        <th>
            <div className="header-cell">
                Mutation chance multiplier radius
                <Tooltip>
                    Radius of mutation chance multiplier.<br/><br/>
                    Every tile within multiplier radius will have its mutationChance multiplied by
                    mutationChanceMultiplier.<br/>
                    Dimension is "tiles" which represents max amount of tiles between origin tile and target tile.
                </Tooltip>
            </div>
        </th>
        <th>
            <div className="header-cell">
                Mutation weight
                <Tooltip>
                    Base mutation weight of tile config among other "competing" tile configs.<br/><br/>
                    May be affected by same tiles in proximity (same in terms of tiles with same "configId").<br/>
                    When tile rolls "mutationChance" parameter and has to mutate into another tile, it will choose
                    random<br/>
                    tile config, yet tile config chance to be picked is proportional to it's "weight" represented by
                    mutationWeight.<br/>
                    Dimension is "positive number".
                </Tooltip>
            </div>
        </th>

        <th>
            <div className="header-cell">
                Mutation weight multiplier
                <Tooltip>
                    Mutation weight multiplier to apply to SAME* tiles around current tile.<br/><br/>
                    SAME tiles are tiles with same "configId".<br/>
                    That parameter is used for grouping tiles. For example, "Forest" tiles are expected to be grouped,
                    so<br/>
                    mutationWeightMultiplier can be adjusted to be number 2, for example. 6 "Forest" tiles on hexagonal
                    grid
                    will<br/>
                    increase mutationWeight of tile in between these 6 tiles by 2^6 or 64 times, thus greatly increasing
                    chance to be<br/>
                    chosen over other possible tile configs.
                </Tooltip>
            </div>
        </th>
        <th>
            <div className="header-cell">
                Mutation weight multiplier radius
                <Tooltip>
                    Radius of mutation weight multiplier.<br/><br/>
                    Tiles with same "configId" within multiplier radius will have its mutationWeight multiplied by<br/>
                    mutationWeightMultiplier.<br/>
                    Dimension is "tiles" which represents max amount of tiles between origin tile and target tile.
                </Tooltip>
            </div>
        </th>
        <th>
            <div className="header-cell">
                Minimum age
                <Tooltip>
                    Minimum amount of epoch cycles when tile will exist no matter what mutation chance is.
                </Tooltip>
            </div>
        </th>
        <th>
            <div className="header-cell">
                Maximum age
                <Tooltip>
                    Maximum amount of epoch cycles when tile may exist.<br/><br/>
                    It may mutate before that value, but once maxAge is stepped over, tile will mutate.
                </Tooltip>
            </div>
        </th>
    </tr>
    </thead>
);

interface TileEditorRowProps {
    /**
     * Tile Config to edit.
     */
    tileConfig: TileConfig;
    /**
     * Tile Config update callback.
     */
    updateTileConfig: (updatedTileConfig: TileConfig) => void;
}

/**
 * TileEditor represented as table row.
 */
const TileEditorRow = ({tileConfig, updateTileConfig}: TileEditorRowProps) => {
    const {
        id,
        mutationChance, mutationChanceMultiplier, mutationChanceMultiplierRadius,
        mutationWeight, mutationWeightMultiplier, mutationWeightMultiplierRadius,
        minAge, maxAge,
    } = tileConfig;

    return <tr>
        <td>
            <Input type="number" value={id} placeholder="e.g. forest-tile"/>
        </td>
        <td>
            <Input type="number" value={mutationChance} placeholder="0-100"/>
        </td>
        <td>
            <Input type="number" value={mutationChanceMultiplier} placeholder="e.g. 1,5"/>
        </td>
        <td>
            <Input type="number" value={mutationChanceMultiplierRadius} placeholder="e.g. 2"/>
        </td>
        <td>
            <Input type="number" value={mutationWeight} placeholder="e.g. 10"/>
        </td>
        <td>
            <Input type="number" value={mutationWeightMultiplier} placeholder="e.g. 1,5"/>
        </td>
        <td>
            <Input type="number" value={mutationWeightMultiplierRadius} placeholder="e.g. 2"/>
        </td>
        <td>
            <Input type="number" value={minAge} placeholder="e.g. 1"/>
        </td>
        <td>
            <Input type="number" value={maxAge} placeholder="e.g. 10"/>
        </td>
    </tr>;
};