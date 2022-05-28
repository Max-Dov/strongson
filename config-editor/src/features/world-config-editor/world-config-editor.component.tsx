import {WorldConfig} from '../../models/world-config.model';
import {Input} from '../../shared/input/input.component';
import {Searchable} from '../searchable/searchable.component';
import {createContext, useState} from 'react';
import {TileShape} from '../../constants/tile-shape.model';
import {TilesEditor} from '../tiles-editor/tiles-editor.component';
import {TileConfig} from '../../models/tile-config.model';
import './world-config-editor.styles.scss'

export const SearchContext = createContext('');

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
    const [searchedString, setSearchedString] = useState<string>('');

    const onConfigIdChange = (id: string): void => setWorldConfig({...worldConfig, id});
    const onConfigGeometryChange = (geometry: string): void => setWorldConfig({
        ...worldConfig,
        tileShape: geometry as TileShape,
    });
    const onConfigTilesChange = (newTiles: Array<Partial<TileConfig>>): void => {
        // TODO consider providing valid "deep partial" type for WorldConfig
        setWorldConfig({...worldConfig, tiles: newTiles as WorldConfig['tiles']})
    }

    return <section className="world-config">
        <h2>
            World Config
            <SearchBar searchString={searchedString} setSearchString={setSearchedString}/>
        </h2>
        <SearchContext.Provider value={searchedString.replace(/ /g, '')}>
            <Searchable searchList={['worldconfig', 'id']}>
                <Input label="ID" value={worldConfig.id} onChange={onConfigIdChange}/>
            </Searchable>
            <Searchable searchList={['worldconfig', 'geometry']}>
                <Input
                    label="Geometry"
                    type="radio"
                    name="world-geometry-input"
                    radioOptions={[
                        {value: TileShape.HEXAGONAL, displayLabel: 'Hexagonal Tiles (honeycombs)'},
                        {value: TileShape.TETRAGONAL, displayLabel: 'Tetragonal Tiles (squares)'},
                    ]}
                    value={worldConfig.tileShape}
                    onChange={onConfigGeometryChange}
                />
            </Searchable>
            <TilesEditor
                tiles={worldConfig.tiles}
                setTiles={onConfigTilesChange}
            />
        </SearchContext.Provider>
    </section>;
};

interface SearchBarProps {
    searchString: string;
    setSearchString: (newSearchString: string) => void;
}

/**
 * Displays search bar for all inputs in World Config.
 */
const SearchBar = ({
    searchString,
    setSearchString,
}: SearchBarProps) => {
    return <div className="search-bar">
        <span><strong>Search fields</strong> by name: </span>
        <Input
            value={searchString}
            onChange={(value) => setSearchString(value)}
            placeholder="e.g. mutation"
            display="inline-block"
        />
    </div>;
};