import React from 'react';
import { useState } from 'react';
import { TileConfig } from '../../../../models/tile-config.model';
import { WorldConfig } from '../../../../models/world-config.model';
// import './results-config.styles.scss';

const ResultConfigComponent = (props: {
    tileConfig: Partial<TileConfig>,
    worldConfig: Partial<WorldConfig>
}) => {
    const worldConfig = props.worldConfig
    const tileConfig = props.tileConfig
    const stringWorldConfig = JSON.stringify(worldConfig, null, 2)
    const stringTileComfig = JSON.stringify(tileConfig, null, 2)

    return (
        <form>
            <textarea value={[stringWorldConfig, stringTileComfig]}>

            </textarea>
        </form>
    )
}

export default ResultConfigComponent;