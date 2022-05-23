import {WorldConfig} from '../../models/world-config.model';
import {TileConfigEditor} from '../tile-config-editor/tile-config-editor.component';
import {TileConfig} from '../../models/tile-config.model';
import {ReactNode} from 'react';

type Tile = Partial<WorldConfig['tiles'][number]>
type Tiles = Array<Tile>

interface TilesEditorProps {
    /**
     * Tiles to edit.
     */
    tiles?: Tiles;
    /**
     * Callback to call once tiles are updated.
     */
    setTiles: (newTiles: Tiles) => void;
}


export const TilesEditor = ({
    tiles,
    setTiles,
}: TilesEditorProps) => {
    const onAddTileToWorld = () => {
        if (tiles) {
            setTiles([{}, ...tiles]);
        } else {
            setTiles([{}]);
        }
    };

    const renderTileConfigEditor = (tileConfig: Partial<TileConfig>, index: number): ReactNode =>
        <TileConfigEditor tileConfig={tileConfig} setTileConfig={(newConfig) => {
            if (tiles) {
                const newTiles = [...tiles];
                newTiles[index] = newConfig;
                setTiles(newTiles);
            } else {
                setTiles([newConfig])
            }
        }}/>;


    return <section>
        <h3>
            World Tiles
        </h3>
        <button onClick={onAddTileToWorld}>Add tile</button>
        {tiles?.map(renderTileConfigEditor)}
    </section>;
};