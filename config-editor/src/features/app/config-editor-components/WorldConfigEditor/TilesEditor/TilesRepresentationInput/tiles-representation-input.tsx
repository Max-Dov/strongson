import React from 'react';
import { TileConfig } from '../../../../../../models/tile-config.model';

const TileRepresentationConfigComponent = (props: {
    tileConfig: Partial<TileConfig>
    setTileConfig: (tileConfig: Partial<TileConfig>) => void;
}) => {

    const onChangeId = (newTileConfigRepresentation: TileConfig['representation']) => {
        const newTileConfig = { ...props.tileConfig }
        newTileConfig.representation = newTileConfigRepresentation
        props.setTileConfig(newTileConfig)

    }

    return (
        <div>
            <h2>
                Tile representation
            </h2>
            <input
                type="text"
                value={props.tileConfig.representation}
                onChange={(e) => onChangeId(e.target.value)}
            />
        </div>
    )
}
export default TileRepresentationConfigComponent;