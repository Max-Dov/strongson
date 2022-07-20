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
                tooltip='List of possible tile representations ids, e.g. "forest-representation-3"'
                className="full-width"
                value={tileConfig.representationsIds}
                onChange={representationsIds => setTileConfig({...tileConfig, representationsIds})}
            />
        </Searchable>
        <Searchable keywords={['tileconfig', 'mutationchance']}>
            <Input label="Mutation chance"
                   labelClassName="numeric-field-label"
                   placeholder="0-100"
                   tooltip='Base chance to mutate into another tile. Dimension is %. E.g. "15" stands for "15%".'
                   type="number"
                   className="numeric-field"
                   value={tileConfig.mutationChance}
                   onChange={mutationChance => setTileConfig({...tileConfig, mutationChance})}/>
        </Searchable>
        <Searchable keywords={['tileconfig', 'minAge']}>
            <Input label="Minimum age"
                   labelClassName="numeric-field-label"
                   placeholder="e.g. 1"
                   tooltip={<span>Minimum amount of <strong>epoch cycles</strong> for tile to exist.</span>}
                   type="number"
                   className="numeric-field"
                   value={tileConfig.minAge}
                   onChange={minAge => setTileConfig({...tileConfig, minAge})}/>
        </Searchable>
        <Searchable keywords={['tileconfig', 'maxAge']}>
            <Input label="Maximum age"
                   labelClassName="numeric-field-label"
                   tooltip={<span>Maximum amount of <strong>epoch cycles</strong> when tile may exist. Tile may mutate earlier than value specified.</span>}
                   placeholder="e.g. 10"
                   type="number"
                   className="numeric-field"
                   value={tileConfig.maxAge}
                   onChange={maxAge => setTileConfig({...tileConfig, maxAge})}/>
        </Searchable>
        <Searchable keywords={['tileconfig', 'mutationWeight']}>
            <Input label="Mutation weight"
                   labelClassName="numeric-field-label"
                   tooltip={<span>
                        Factor to count when tile needs to mutate into another tile.<br/>
                        For example, when tile must mutate, it will roll a random number and then pick new tile.<br/>
                        Possible tiles with <strong>greater mutationWeight</strong> will have greater chance to be mutated into.
                   </span>}
                   placeholder="e.g. 10"
                   type="number"
                   className="numeric-field"
                   value={tileConfig.mutationWeight}
                   onChange={mutationWeight => setTileConfig({...tileConfig, mutationWeight})}/>
        </Searchable>
        <Searchable keywords={['tileconfig', 'crowdWeightMultiplier']}>
            <Input label="Crowd weight multiplier"
                   labelClassName="numeric-field-label"
                   tooltip={<span>
                        Factor to count when tile needs to mutate into another tile.<br/>
                        Useful when tiles need to be grouped up or loosely spread across map.<br/>
                        For example, when tile must mutate, it will roll a random number and then pick new tile.<br/>
                        Possible tiles that have <strong>greater number around current coordinate</strong> will have greater chance to be mutated into.
                   </span>}
                   placeholder="e.g. 1,5"
                   type="number"
                   className="numeric-field"
                   value={tileConfig.crowdWeightMultiplier}
                   onChange={crowdWeightMultiplier => setTileConfig({...tileConfig, crowdWeightMultiplier})}/>
        </Searchable>
        <Searchable keywords={['tileconfig', 'crowdWeightMultiplierRadius']}>
            <Input label="Crowd weight multiplier radius"
                   labelClassName="numeric-field-label"
                   tooltip={<span>Radius of <strong>crowd weight multiplier</strong> effect.</span>}
                   placeholder="e.g. 2"
                   type="number"
                   className="numeric-field"
                   value={tileConfig.crowdWeightMultiplierRadius}
                   onChange={crowdWeightMultiplierRadius => setTileConfig({
                       ...tileConfig,
                       crowdWeightMultiplierRadius,
                   })}/>
        </Searchable>
        <Searchable keywords={['tileconfig', 'neighborsMutationMultiplier']}>
            <Input label="Neighbors mutation multiplier"
                   labelClassName="numeric-field-label"
                   tooltip={<span>
                       Multiplier on neighbor tiles that multiplies their mutationChance.<br/>
                       Useful when neighbor tiles need to be forced to mutate.
                   </span>}
                   placeholder="e.g. 1,5"
                   type="number"
                   className="numeric-field"
                   value={tileConfig.neighborsMutationMultiplier}
                   onChange={neighborsMutationMultiplier => setTileConfig({
                       ...tileConfig,
                       neighborsMutationMultiplier,
                   })}/>
        </Searchable>
        <Searchable keywords={['tileconfig', 'neighborsMutationMultiplierRadius']}>
            <Input label="Neighbors mutation multiplier radius"
                   labelClassName="numeric-field-label"
                   tooltip={<span>Radius of <strong>neighbors mutation multiplier</strong> effect.</span>}
                   placeholder="e.g. 2"
                   type="number"
                   className="numeric-field"
                   value={tileConfig.neighborsMutationMultiplierRadius}
                   onChange={neighborsMutationMultiplierRadius => setTileConfig({
                       ...tileConfig,
                       neighborsMutationMultiplierRadius,
                   })}/>
        </Searchable>
        <NeighborsEditor neighbors={tileConfig.neighbors} setNeighbors={onNewNeighbors} originId={tileConfig.id}/>
    </section>;
};