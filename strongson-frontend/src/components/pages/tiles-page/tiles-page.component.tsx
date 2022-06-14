import React from 'react';
import {TileRepresentation} from '@models/tile-representation.model';
import {TilePreview} from '@components/features/tile-preview/tile-preview.component';
import './tiles-page.styles.scss';
import {TILE_REPRESENTATIONS} from '@constants/tile-representations.const';

export const TilesPage = () => {

    const renderTilePreview = (configId: TileRepresentation['configId'], tileRepresentations: Array<TileRepresentation>) =>
        <div key={configId} className="tile-preview-container">
            <TilePreview  tileRepresentations={tileRepresentations}/>
        </div>;


    return (<section id="tiles-page">
        <h1>
            Tiles
        </h1>
        <p>
            All game tiles in Strongson! <strong>Click on tile</strong> to read more info.
        </p>
        <section className="list-of-tiles">
            {[...TILE_REPRESENTATIONS.entries()]
                .map(([configId, representations]) => renderTilePreview(configId, representations))}
        </section>
    </section>);
};
