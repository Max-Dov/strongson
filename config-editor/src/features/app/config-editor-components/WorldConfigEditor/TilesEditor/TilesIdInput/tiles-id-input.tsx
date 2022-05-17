import React from 'react';
import { TileConfig } from '../../../../../../models/tile-config.model';

const TileIdConfigComponent = (props: {
    tileConfig: Partial<TileConfig>
    setTileConfig: (tileConfig: Partial<TileConfig>) => void;
}) => {

    const onChangeId = (newTileConfigId: TileConfig['id']) => {
        const newTileConfig = { ...props.tileConfig }
        newTileConfig.id = newTileConfigId
        props.setTileConfig(newTileConfig)

    }

    return (
        <div>
            <h2>
                Tile ID
            </h2>
            <input
                type="text"
                value={props.tileConfig.id}
                onChange={(e) => onChangeId(e.target.value)}
            />
        </div>
    )
}
export default TileIdConfigComponent;