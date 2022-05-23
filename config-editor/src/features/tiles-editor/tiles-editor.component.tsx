import {WorldConfig} from '../../models/world-config.model';
import {TileConfigEditor} from '../tile-config-editor/tile-config-editor.component';
import {TileConfig} from '../../models/tile-config.model';
import {ReactNode} from 'react';

type Tile = Partial<WorldConfig['tiles'][number]>
type Tiles = Array<Tile>

interface TilesEditor {
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
}: TilesEditor) => {
    const onAddTileToWorld = () => {
        if (tiles) {
            setTiles([{}, ...tiles])
        } else {
            setTiles([{}])
        }
    }

    const renderTileConfig = (tileConfig: Partial<TileConfig>, index: number): ReactNode =>
        <TileConfigEditor tileConfig={tileConfig} setTileConfig={() => {}} />


    return <section>
        <h3>
            World Tiles
        </h3>
        <button onClick={onAddTileToWorld}>Add tile</button>
        {tiles?.map(renderTileConfig)}

    </section>
};