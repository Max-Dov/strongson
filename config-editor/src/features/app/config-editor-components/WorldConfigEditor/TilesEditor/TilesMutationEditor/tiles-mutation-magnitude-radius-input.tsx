import React from 'react';
import { TileConfig } from '../../../../../../models/tile-config.model';

const TileMutationMagnitudeRadiusConfigComponent = (props: {
    tileConfig: Partial<TileConfig>
    setTileConfig: (tileConfig: Partial<TileConfig>) => void;
}) => {

    const onChangeId = (newTileConfigMutationMagnitudeRadius: TileConfig['mutationMagnitudeRadius']) => {
        const newTileConfig = { ...props.tileConfig }
        newTileConfig.mutationMagnitudeRadius = newTileConfigMutationMagnitudeRadius
        props.setTileConfig(newTileConfig)

    }

    return (
        <div>
            <h2>
                Tile  mutation Magnitude Radius
            </h2>
            <input
                type="text"
                value={props.tileConfig.chanceToMutate}
                onChange={(e) => onChangeId(e.target.valueAsNumber)}
            />
        </div>
    )
}
export default TileMutationMagnitudeRadiusConfigComponent;