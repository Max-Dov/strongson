import {WorldConfig} from '../../models/world-config.model';
import {Input} from '../../shared/input.component';
import {Searchable} from '../searchable/searchable.component';
import {ChangeEvent, useState} from 'react';
import {WorldGeometry} from '../../constants/world-geometry.model';

interface WorldConfigEditorProps {
    worldConfig: Partial<WorldConfig>;
    setWorldConfig: (worldConfig: Partial<WorldConfig>) => void;
}

export const WorldConfigEditor = ({
    worldConfig,
    setWorldConfig,
}: WorldConfigEditorProps) => {
    const [searchedString, setSearchedString] = useState<string>('');

    const onConfigIdChange = (e: ChangeEvent<HTMLInputElement>) => setWorldConfig({...worldConfig, id: e.target.value});
    const onConfigGeometryChange = (e: ChangeEvent<HTMLInputElement>) => setWorldConfig({...worldConfig, geometry: e.target.value as WorldGeometry});

    return <section>
        <h2>
            World Config
        </h2>
        <SearchBar searchString={searchedString} setSearchString={setSearchedString}/>
        <Searchable searchedString={searchedString} searchList={['worldconfig', 'id']}>
            <Input label="ID" value={worldConfig.id} onChange={onConfigIdChange}/>
        </Searchable>
        <Searchable searchedString={searchedString} searchList={['worldconfig', 'geometry']}>
            <Input
                label="Geometry"
                type="radio"
                name="world-geometry-input"
                radioOptions={[
                    {value: WorldGeometry.HEXAGONAL, displayLabel: 'Hexagonal Tiles (honeycombs)'},
                    {value: WorldGeometry.TETRAGONAL, displayLabel: 'Tetragonal Tiles (squares)'},
                ]}
                value={worldConfig.geometry}
                onChange={onConfigGeometryChange}
            />
        </Searchable>
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
    return <div>
        <span>Search fields by name: </span>
        <input value={searchString} onChange={(e) => setSearchString(e.target.value)}/>
    </div>;
};