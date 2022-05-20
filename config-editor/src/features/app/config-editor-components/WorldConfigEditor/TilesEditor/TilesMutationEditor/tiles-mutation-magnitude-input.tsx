import React from 'react';
import { TileConfig } from '../../../../../../models/tile-config.model';

const TileMutationMagnitudeConfigComponent = (props: {
    tileConfig: Partial<TileConfig>
    setTileConfig: (tileConfig: Partial<TileConfig>) => void;
}) => {

    const onChangeMutationMagnitude = (newTileConfigMutationMagnitude: TileConfig['mutationMagnitude']) => {
        const newTileConfig = { ...props.tileConfig }
        newTileConfig.mutationMagnitude = newTileConfigMutationMagnitude
        props.setTileConfig(newTileConfig)

    }

    return (
        <div>
            <h2>
                Tile   mutation Magnitude
            </h2>
            <input
                type="number"
                value={props.tileConfig.mutationMagnitude}
                onChange={(e) => onChangeMutationMagnitude(e.target.valueAsNumber)}
            />
        </div>
    )
}
export default TileMutationMagnitudeConfigComponent;