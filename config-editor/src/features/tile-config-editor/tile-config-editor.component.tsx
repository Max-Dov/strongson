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
    const tileName = tileConfig?.displayName;
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
            {tileName ? `"${tileName}" Tile` : 'New Tile'}
            <RemoveCircleButton className="remove-button" onClick={onRemove}/>
        </h4>
        <Searchable searchList={['tileconfig', 'id']}>
            <Input label="ID" value={tileConfig.id} onChange={onNewId} className="full-width"/>
        </Searchable>
        <Searchable searchList={['tileconfig', 'displayName']}>
            <Input label="Display Name" value={tileConfig.displayName} className="full-width"
                   onChange={displayName => setTileConfig({...tileConfig, displayName})}/>
        </Searchable>
        <Searchable searchList={['tileconfig', 'representation']}>
            <Input
                label="Representation"
                type="array"
                value={tileConfig.representation}
                className="full-width"
                onChange={representation => setTileConfig({...tileConfig, representation})}
            />
        </Searchable>
        <Searchable searchList={['tileconfig', 'mutationchance']}>
            <Input label={<span className="mutation-label">Mutation chance (%)</span>}
                   value={tileConfig.chanceToMutate} type="number"
                   className="mutation-field"
                   onChange={chanceToMutate => setTileConfig({...tileConfig, chanceToMutate})}/>
        </Searchable>
        <Searchable searchList={['tileconfig', 'mutationWeight']}>
            <Input label={<span className="mutation-label">Mutation weight</span>}
                   value={tileConfig.mutationWeight}
                   type="number"
                   className="mutation-field"
                   onChange={mutationWeight => setTileConfig({...tileConfig, mutationWeight})}/>
        </Searchable>
        <Searchable searchList={['tileconfig', 'mutationMagnitude']}>
            <Input label={<span className="mutation-label">Mutation magnitude</span>}
                   value={tileConfig.mutationMagnitude}
                   type="number"
                   className="mutation-field"
                   onChange={mutationMagnitude => setTileConfig({...tileConfig, mutationMagnitude})}/>
        </Searchable>
        <Searchable searchList={['tileconfig', 'mutationMagnitudeRadius']}>
            <Input label={<span className="mutation-label">Mutation radius</span>}
                   value={tileConfig.mutationMagnitudeRadius}
                   type="number"
                   className="mutation-field"
                   onChange={mutationMagnitudeRadius => setTileConfig({...tileConfig, mutationMagnitudeRadius})}/>
        </Searchable>
        <NeighborsEditor neighbors={tileConfig.neighbors} setNeighbors={onNewNeighbors} originId={tileConfig.id}/>
    </section>;
};