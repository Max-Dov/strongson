import {WorldConfig} from '@models/world-config.model';
import {Input} from '@shared/input/input.component';
import {Searchable} from '@features/searchable/searchable.component';
import {TileShape} from '@constants/tile-shape.enum';
import {TilesEditor} from '@features/tiles-editor/tiles-editor.component';
import {TileConfig} from '@models/tile-config.model';
import './world-config-editor.styles.scss';
import React from 'react';

interface WorldConfigEditorProps {
    worldConfig: Partial<WorldConfig>;
    setWorldConfig: (worldConfig: Partial<WorldConfig>) => void;
}

/**
 * Editor for WorldConfig fields.
 */
export const WorldConfigEditor = ({
    worldConfig,
    setWorldConfig,
}: WorldConfigEditorProps) => {
    const onConfigIdChange = (id: string): void => setWorldConfig({...worldConfig, id});
    const onConfigGeometryChange = (geometry: string): void => setWorldConfig({
        ...worldConfig,
        tileShape: geometry as TileShape,
    });
    const onConfigTilesChange = (newTiles: Array<Partial<TileConfig>>): void => {
        // TODO consider providing valid "deep partial" type for WorldConfig
        setWorldConfig({...worldConfig, tiles: newTiles as WorldConfig['tiles']});
    };

    return <section className="world-config">
        <h2>
            World Config
        </h2>
            <div className="id-and-config-row">
                <Searchable keywords={['worldconfig', 'id']}>
                    <div className="world-config-id-input">
                        <Input label="ID"
                               tooltip='Unique world ID; e.g. "land-world", "cloud-world".'
                               id="world-config-id-input"
                               className="full-width"
                               placeholder="e.g. Coolest Config Imaginable v1"
                               value={worldConfig.id}
                               onChange={onConfigIdChange}
                               display="block"/>
                    </div>
                </Searchable>
                <Searchable keywords={['worldconfig', 'geometry']}>
                    <Input
                        label="Tile Shape"
                        tooltip="Shape of every tile in world."
                        type="radio"
                        name="world-geometry-input"
                        radioOptions={[
                            {value: TileShape.HEXAGONAL, displayLabel: 'Hexagonal Tiles (honeycombs)'},
                            {value: TileShape.TETRAGONAL, displayLabel: 'Tetragonal Tiles (squares)'},
                        ]}
                        value={worldConfig.tileShape}
                        onChange={onConfigGeometryChange}
                        display="inline-block"
                    />
                </Searchable>
            </div>
            <TilesEditor
                tiles={worldConfig.tiles}
                setTiles={onConfigTilesChange}
            />
    </section>;
};
