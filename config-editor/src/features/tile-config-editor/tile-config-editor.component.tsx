import {TileConfig} from '@models/tile-config.model';
import {Searchable} from '@features/searchable/searchable.component';
import {Input} from '@shared/input/input.component';
import {NeighborsEditor} from '@features/neighbors-editor/neighbors-editor.component';
import {NeighborConstraint} from '@models/neighbor-constraint.model';
import './tile-config-editor.styles.scss';
import {RemoveCircleButton} from '@svgs/remove-circle-button.svg';
import React from 'react';

interface TileConfigEditorProps {
    /**
     * Tile config to edit.
     */
    tileConfig: Partial<TileConfig>;
    /**
     * Callback to call when tile config has changed.
     */
    setTileConfig: (newTileConfig: Partial<TileConfig>) => void;
    /**
     * Callback to call once "Remove" button is clicked;
     */
    onRemove: () => void;
}

/**
 * Editor for TileConfig.
 */
export const TileConfigEditor = ({
    tileConfig,
    setTileConfig,
    onRemove,
}: TileConfigEditorProps) => {
    const tileId = tileConfig.id;
    const onNewNeighbors = (neighbors: Array<Partial<NeighborConstraint>>) => setTileConfig({
        ...tileConfig,
        neighbors: neighbors as Array<NeighborConstraint>,
    });

    const onNewId = (id: TileConfig['id']) => {
        setTileConfig({
            ...tileConfig,
            id,
            neighbors: tileConfig.neighbors?.map(neighbor => ({...neighbor, configId: id})),
        });
    };

    return <section className="tile-config-editor">
        <h4>
            {tileId ? `"${tileId}" tile` : 'New Tile'}
            <RemoveCircleButton className="remove-button" onClick={onRemove}/>
        </h4>
        <Searchable keywords={['tileconfig', 'id']}>
            <Input
                label="ID"
                placeholder="e.g. forest-tile"
                tooltip='Unique tile ID; e.g. "castle-lvl1".'
                className="full-width"
                value={tileConfig.id}
                onChange={onNewId}
            />
        </Searchable>
        <Searchable keywords={['tileconfig', 'representationsids']}>
            <Input
                label="Representations IDs"
                type="array"
                placeholder="e.g. forest-representation-3"
                tooltip={<span>
                    List of tile representations IDs.<br/><br/>
                    Representation contains display info about tile and is dependent on game implementation.<br/>
                    But server doing calculations refers to representation by <strong>ID</strong>, allowing representation to be as flexible as frontend needs.
                </span>}
                className="full-width"
                value={tileConfig.representationsIds}
                onChange={representationsIds => setTileConfig({...tileConfig, representationsIds})}
            />
        </Searchable>
        {/** Mutation chance fields */}
        <Searchable keywords={['tileconfig', 'mutationchance']}>
            <Input label="Mutation chance"
                   labelClassName="numeric-field-label"
                   placeholder="0-100"
                   tooltip={<span>
                       Base chance to mutate into another tile. May be affected by neighboring tiles.<br/><br/>
                       Tile can not mutate into itself, e.g.: "Forest" tile can not mutate into "Forest" tile, technically remaining same tile with reset "birthEpoch".<br/>
                       Dimension is percents (%). E.g. "15" stands for "15%".
                   </span>}
                   type="number"
                   className="numeric-field"
                   value={tileConfig.mutationChance}
                   onChange={mutationChance => setTileConfig({...tileConfig, mutationChance})}/>
        </Searchable>
        <Searchable keywords={['tileconfig', 'mutationchancemultiplier']}>
            <Input label="Mutation chance multiplier"
                   labelClassName="numeric-field-label"
                   tooltip={<span>
                       Mutation chance multiplier to apply to NEIGHBORING tiles around current tile.<br/><br/>
                       If neighboring tiles need to be forced to mutate or have their mutation chance decreased, <br/>
                       then that parameter can be adjusted.<br/>
                       Mutation chance multiplier does not affect origin tile.<br/>
                       Dimension is "positive number" that would be multiplied with "percents (%)" units.
                   </span>}
                   placeholder="e.g. 1,5"
                   type="number"
                   className="numeric-field"
                   value={tileConfig.mutationChanceMultiplier}
                   onChange={mutationChanceMultiplier => setTileConfig({
                       ...tileConfig,
                       mutationChanceMultiplier,
                   })}/>
        </Searchable>
        <Searchable keywords={['tileconfig', 'mutationChanceMultiplierRadius']}>
            <Input label="Mutation chance multiplier radius"
                   labelClassName="numeric-field-label"
                   tooltip={<span>
                       Radius of mutation chance multiplier.<br/><br/>
                       Every tile within multiplier radius will have its mutationChance multiplied by mutationChanceMultiplier.<br/>
                       Dimension is "tiles" which represents max amount of tiles between origin tile and target tile.
                   </span>}
                   placeholder="e.g. 2"
                   type="number"
                   className="numeric-field"
                   value={tileConfig.mutationChanceMultiplierRadius}
                   onChange={mutationChanceMultiplierRadius => setTileConfig({
                       ...tileConfig,
                       mutationChanceMultiplierRadius,
                   })}/>
        </Searchable>
        {/** Mutation weight fields */}
        <Searchable keywords={['tileconfig', 'mutationWeight']}>
            <Input label="Mutation weight"
                   labelClassName="numeric-field-label"
                   tooltip={<span>
                       Base mutation weight of tile config among other "competing" tile configs.<br/><br/>
                       May be affected by same tiles in proximity (same in terms of tiles with same "configId").<br/>
                       When tile rolls "mutationChance" parameter and has to mutate into another tile, it will choose random<br/>
                       tile config, yet tile config chance to be picked is proportional to it's "weight" represented by mutationWeight.<br/>
                       Dimension is "positive number".
                   </span>}
                   placeholder="e.g. 10"
                   type="number"
                   className="numeric-field"
                   value={tileConfig.mutationWeight}
                   onChange={mutationWeight => setTileConfig({...tileConfig, mutationWeight})}/>
        </Searchable>
        <Searchable keywords={['tileconfig', 'mutationWeightMultiplier']}>
            <Input label="Mutation weight multiplier"
                   labelClassName="numeric-field-label"
                   tooltip={<span>
                       Mutation weight multiplier to apply to SAME* tiles around current tile.<br/><br/>
                       SAME tiles are tiles with same "configId".<br/>
                       That parameter is used for grouping tiles. For example, "Forest" tiles are expected to be grouped, so<br/>
                       mutationWeightMultiplier can be adjusted to be number 2, for example. 6 "Forest" tiles on hexagonal grid will<br/>
                       increase mutationWeight of tile in between these 6 tiles by 2^6 or 64 times, thus greatly increasing chance to be<br/>
                       chosen over other possible tile configs.</span>}
                   placeholder="e.g. 1,5"
                   type="number"
                   className="numeric-field"
                   value={tileConfig.mutationWeightMultiplier}
                   onChange={mutationWeightMultiplier => setTileConfig({...tileConfig, mutationWeightMultiplier})}/>
        </Searchable>
        <Searchable keywords={['tileconfig', 'mutationWeightMultiplierRadius']}>
            <Input label="Mutation weight multiplier radius"
                   labelClassName="numeric-field-label"
                   tooltip={<span>
                       Radius of mutation weight multiplier.<br/><br/>
                       Tiles with same "configId" within multiplier radius will have its mutationWeight multiplied by<br/>
                       mutationWeightMultiplier.<br/>
                       Dimension is "tiles" which represents max amount of tiles between origin tile and target tile.
                   </span>}
                   placeholder="e.g. 2"
                   type="number"
                   className="numeric-field"
                   value={tileConfig.mutationWeightMultiplierRadius}
                   onChange={mutationWeightMultiplierRadius => setTileConfig({
                       ...tileConfig,
                       mutationWeightMultiplierRadius,
                   })}/>
        </Searchable>

        {/** Age fields */}
        <Searchable keywords={['tileconfig', 'minAge']}>
            <Input label="Minimum age"
                   labelClassName="numeric-field-label"
                   placeholder="e.g. 1"
                   tooltip={<span>Minimum amount of epoch cycles when tile will exist no matter what mutation chance is.</span>}
                   type="number"
                   className="numeric-field"
                   value={tileConfig.minAge}
                   onChange={minAge => setTileConfig({...tileConfig, minAge})}/>
        </Searchable>
        <Searchable keywords={['tileconfig', 'maxAge']}>
            <Input label="Maximum age"
                   labelClassName="numeric-field-label"
                   tooltip={<span>
                       Maximum amount of epoch cycles when tile may exist.<br/><br/>
                       It may mutate before that value, but once maxAge is stepped over, tile will mutate.
                       </span>}
                   placeholder="e.g. 10"
                   type="number"
                   className="numeric-field"
                   value={tileConfig.maxAge}
                   onChange={maxAge => setTileConfig({...tileConfig, maxAge})}/>
        </Searchable>
        <NeighborsEditor neighbors={tileConfig.neighbors} setNeighbors={onNewNeighbors} originId={tileConfig.id}/>
    </section>;
};