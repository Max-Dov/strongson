import {ReactNode} from 'react';
import {WorldConfig} from '../../models/world-config.model';
import {TileConfigEditor} from '../tile-config-editor/tile-config-editor.component';
import {TileConfig} from '../../models/tile-config.model';
import {AddHexagonButton} from '../../svgs/add-hexagon-button.svg';
import './tiles-editor.styles.scss';
import {Tooltip} from '../../shared/tooltip/tooltip.component';

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
            setTiles([...tiles, {}]);
        } else {
            setTiles([{}]);
        }
    };

    const onRemoveTile = (index: number) => {
        if (tiles) {
            const newTiles = [...tiles];
            newTiles.splice(index, 1);
            setTiles(newTiles);
        }
    };

    const onConfigChange = (newConfig: Partial<TileConfig>, index: number) => {
        if (tiles) {
            const newTiles = [...tiles];
            newTiles[index] = newConfig;
            setTiles(newTiles);
        } else {
            setTiles([newConfig]);
        }
    };

    const renderTileConfigEditor = (tileConfig: Partial<TileConfig>, index: number): ReactNode =>
        <TileConfigEditor
            tileConfig={tileConfig}
            setTileConfig={(newTileConfig) => onConfigChange(newTileConfig, index)}
            onRemove={() => onRemoveTile(index)}
        />;


    return <section className="tiles-editor">
        <h3>
            <strong>World Tiles</strong>
            <Tooltip>Tiles that can exist in World.</Tooltip>
            <AddHexagonButton onClick={onAddTileToWorld}/>
        </h3>
        <div className="tiles-container">
            {tiles?.map(renderTileConfigEditor)}
        </div>
    </section>;
};