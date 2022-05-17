import React from 'react';
import { TileConfig } from '../../../../../../models/tile-config.model';

const TileNameConfigComponent = (props: {
    tileConfig: Partial<TileConfig>
    setTileConfig: (tileConfig: Partial<TileConfig>) => void;
}) => {

    const onChangeName = (newTileConfigName: TileConfig['displayName']) => {
        const newTileConfig = { ...props.tileConfig }
        newTileConfig.displayName = newTileConfigName
        props.setTileConfig(newTileConfig)

    }

    return (
        <div>
            <h2>
                Tile Name
            </h2>
            <input
                type="text"
                value={props.tileConfig.displayName}
                onChange={(e) => onChangeName(e.target.value)}
            />
        </div>
    )
}
export default TileNameConfigComponent;