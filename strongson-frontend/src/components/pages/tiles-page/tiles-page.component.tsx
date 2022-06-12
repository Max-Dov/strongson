import React from 'react';
import './tiles-page.styles.scss';
import {TileRepresentation} from '@models/tile-representation.model';
import {TilePreview} from '@components/features/tile-preview/tile-preview.component';

export const TilesPage = () => {

    const renderTilePreview = (tileRepresentation: TileRepresentation) =>
        <div key={tileRepresentation.configId}>
            <TilePreview tileRepresentation={tileRepresentation}/>
        </div>;


    return (<section id="tiles-page">
        <h1>
            Tiles
        </h1>
        <p>
            All game tiles in Strongson! <strong>Click on tile</strong> to read more info.
        </p>
        <section className="list-of-tiles">
            {[...STRONGSON_TILES.values()].map(renderTilePreview)}
        </section>
    </section>);
};

/**
 * Enum of all config ids.
 */
enum ConfigIds {
    CITY_LVL_1 = 'city-lvl-1'
}

/**
 * Map of all game tile representations linked to representation config ids.
 */
const STRONGSON_TILES = new Map<TileRepresentation['configId'], TileRepresentation>([
    [ConfigIds.CITY_LVL_1, {
        configId: ConfigIds.CITY_LVL_1,
        displayName: 'Town I',
        representation: ['city-lvl-1-0.png'],
        description:
            <p>
                Small town. Provides <strong>workers</strong>. Workers can be used for gathering,
                crop farming, scouting. Workers want to eat and don't like being eaten (by wolves).
            </p>,
    }],
]);

