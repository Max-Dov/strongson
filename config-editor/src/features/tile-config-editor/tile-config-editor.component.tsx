import {TileConfig} from '../../models/tile-config.model';
import {Searchable} from '../searchable/searchable.component';
import {Input} from '../../shared/input.component';

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

    return <section>
        <h4>
            {tileName ? `Tile "${tileName}"` : 'New Tile'}
        </h4>
        <Searchable searchList={['tileconfig', 'id']}>
            <Input label="ID" value={tileConfig.id}/>
        </Searchable>
        <Searchable searchList={['tileconfig', 'displayName']}>
            <Input label="Display Name" value={tileConfig.displayName}/>
        </Searchable>
        <Searchable searchList={['tileconfig', 'chanceToMutate']}>
            <Input label="Chance to mutate (%)" value={tileConfig.chanceToMutate}/>
        </Searchable>
        <Searchable searchList={['tileconfig', 'mutationWeight']}>
            <Input label="Mutation weight" value={tileConfig.mutationWeight}/>
        </Searchable>
        <Searchable searchList={['tileconfig', 'mutationMagnitude']}>
            <Input label="Mutation magnitude" value={tileConfig.mutationMagnitude}/>
        </Searchable>
        <Searchable searchList={['tileconfig', 'mutationMagnitudeRadius']}>
            <Input label="Mutation magnitude radius" value={tileConfig.mutationMagnitudeRadius}/>
        </Searchable>
    </section>;
};