import {TileConfig} from '../../models/tile-config.model';
import {Searchable} from '../searchable/searchable.component';
import {Input} from '../../shared/input/input.component';
import {NeighborsEditor} from '../neighbors-editor/neighbors-editor.component';
import {NeighborConstraint} from '../../models/neighbor-constraint.model';
import './tile-config-editor.styles.scss';
import {RemoveCircleButton} from '../../svgs/remove-circle-button.svg';

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
    const tileId = tileConfig.id
    const onNewNeighbors = (neighbors: Array<Partial<NeighborConstraint>>) => setTileConfig({
        ...tileConfig,
        neighbors: neighbors as Array<NeighborConstraint>,
    });

    const onNewId = (id: TileConfig['id']) => {
        setTileConfig({
            ...tileConfig,
            id,
            neighbors: tileConfig.neighbors?.map(neighbor => ({...neighbor, id})),
        });
    };

    return <section className="tile-config-editor">
        <h4>
            {tileId ? `"${tileId}" tile` : 'New Tile'}
            <RemoveCircleButton className="remove-button" onClick={onRemove}/>
        </h4>
        <Searchable searchList={['tileconfig', 'id']}>
            <Input label="ID" value={tileConfig.id} onChange={onNewId} className="full-width"/>
        </Searchable>
        <Searchable searchList={['tileconfig', 'mutationchance']}>
            <Input label={<span className="numeric-field-label">Mutation chance (%)</span>}
                   value={tileConfig.mutationChance} type="number"
                   className="numeric-field"
                   onChange={mutationChance => setTileConfig({...tileConfig, mutationChance})}/>
        </Searchable>
        <Searchable searchList={['tileconfig', 'crowdWeightMultiplier']}>
            <Input label={<span className="numeric-field-label">Crowd weight multiplier</span>}
                   value={tileConfig.crowdWeightMultiplier}
                   type="number"
                   className="numeric-field"
                   onChange={crowdWeightMultiplier => setTileConfig({...tileConfig, crowdWeightMultiplier})}/>
        </Searchable>
        <Searchable searchList={['tileconfig', 'crowdWeightMultiplierRadius']}>
            <Input label={<span className="numeric-field-label">Crowd weight multiplier radius</span>}
                   value={tileConfig.crowdWeightMultiplierRadius}
                   type="number"
                   className="numeric-field"
                   onChange={crowdWeightMultiplierRadius => setTileConfig({...tileConfig, crowdWeightMultiplierRadius})}/>
        </Searchable>
        <Searchable searchList={['tileconfig', 'mutationWeight']}>
            <Input label={<span className="numeric-field-label">Mutation weight</span>}
                   value={tileConfig.mutationWeight}
                   type="number"
                   className="numeric-field"
                   onChange={mutationWeight => setTileConfig({...tileConfig, mutationWeight})}/>
        </Searchable>
        <Searchable searchList={['tileconfig', 'neighborsMutationMultiplier']}>
            <Input label={<span className="numeric-field-label">Neighbors mutation multiplier</span>}
                   value={tileConfig.neighborsMutationMultiplier}
                   type="number"
                   className="numeric-field"
                   onChange={neighborsMutationMultiplier => setTileConfig({...tileConfig, neighborsMutationMultiplier})}/>
        </Searchable>
        <Searchable searchList={['tileconfig', 'neighborsMutationMultiplierRadius']}>
            <Input label={<span className="numeric-field-label">Neighbors mutation multiplier radius</span>}
                   value={tileConfig.neighborsMutationMultiplierRadius}
                   type="number"
                   className="numeric-field"
                   onChange={neighborsMutationMultiplierRadius => setTileConfig({...tileConfig, neighborsMutationMultiplierRadius})}/>
        </Searchable>
        <NeighborsEditor neighbors={tileConfig.neighbors} setNeighbors={onNewNeighbors} originId={tileConfig.id}/>
    </section>;
};