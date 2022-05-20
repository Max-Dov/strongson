import React from 'react';
import { TileConfig } from '../../../../../../models/tile-config.model';

const TileMutationWeightConfigComponent = (props: {
    tileConfig: Partial<TileConfig>
    setTileConfig: (tileConfig: Partial<TileConfig>) => void;
}) => {

    const onChangeId = (newTileConfigMutationWeight: TileConfig['mutationWeight']) => {
        const newTileConfig = { ...props.tileConfig }
        newTileConfig.mutationWeight = newTileConfigMutationWeight
        props.setTileConfig(newTileConfig)

    }

    return (
        <div>
            <h2>
                Tile  mutation Weight
            </h2>
            <input
                type="number"
                value={props.tileConfig.mutationWeight}
                onChange={(e) => onChangeId(e.target.valueAsNumber)}
            />
        </div>
    )
}
export default TileMutationWeightConfigComponent;