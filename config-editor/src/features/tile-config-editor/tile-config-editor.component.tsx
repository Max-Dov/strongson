import {TileConfig} from '../../models/tile-config.model';
import {Searchable} from '../searchable/searchable.component';
import {Input} from '../../shared/input/input.component';
import {NeighborsEditor} from '../neighbors-editor/neighbors-editor.component';
import {NeighborConstraint} from '../../models/neighbor-constraint.model';

interface TileConfigEditorProps {
    tileConfig: Partial<TileConfig>;
    setTileConfig: (newTileConfig: Partial<TileConfig>) => void;
}

/**
 * Editor for TileConfig.
 */
export const TileConfigEditor = ({
    tileConfig,
    setTileConfig,
}: TileConfigEditorProps) => {
    const tileName = tileConfig?.displayName;
    const onNewNeighbors = (neighbors: Array<Partial<NeighborConstraint>>) => setTileConfig({
        ...tileConfig,
        neighbors: neighbors as Array<NeighborConstraint>,
    });

    return <section>
        <h4>
            {tileName ? `Tile "${tileName}"` : 'New Tile'}
        </h4>
        <Searchable searchList={['tileconfig', 'id']}>
            <Input label="ID" value={tileConfig.id}
                   onChange={id => setTileConfig({...tileConfig, id})}/>
        </Searchable>
        <Searchable searchList={['tileconfig', 'displayName']}>
            <Input label="Display Name" value={tileConfig.displayName}
                   onChange={displayName => setTileConfig({...tileConfig, displayName})}/>
        </Searchable>
        <Searchable searchList={['tileconfig', 'representation']}>
            <Input
                label="Representation"
                type="array"
                value={tileConfig.representation}
                onChange={representation => setTileConfig({...tileConfig, representation})}
            />
        </Searchable>
        <Searchable searchList={['tileconfig', 'mutationchance']}>
            <Input label="Mutation chance (%)" value={tileConfig.chanceToMutate} type="number"
                   onChange={chanceToMutate => setTileConfig({...tileConfig, chanceToMutate})}/>
        </Searchable>
        <Searchable searchList={['tileconfig', 'mutationWeight']}>
            <Input label="Mutation weight" value={tileConfig.mutationWeight}
                   onChange={mutationWeight => setTileConfig({...tileConfig, mutationWeight})}/>
        </Searchable>
        <Searchable searchList={['tileconfig', 'mutationMagnitude']}>
            <Input label="Mutation magnitude" value={tileConfig.mutationMagnitude}
                   onChange={mutationMagnitude => setTileConfig({...tileConfig, mutationMagnitude})}/>
        </Searchable>
        <Searchable searchList={['tileconfig', 'mutationMagnitudeRadius']}>
            <Input label="Mutation magnitude radius" value={tileConfig.mutationMagnitudeRadius}
                   onChange={mutationMagnitudeRadius => setTileConfig({...tileConfig, mutationMagnitudeRadius})}/>
        </Searchable>
        <NeighborsEditor neighbors={tileConfig.neighbors} setNeighbors={onNewNeighbors} originId={tileConfig.id}/>
    </section>;
};