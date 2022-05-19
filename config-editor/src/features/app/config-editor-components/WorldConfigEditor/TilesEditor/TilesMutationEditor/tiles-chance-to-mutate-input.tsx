import React from 'react';
import { TileConfig } from '../../../../../../models/tile-config.model';

const TileChanceToMutateConfigComponent = (props: {
    tileConfig: Partial<TileConfig>
    setTileConfig: (tileConfig: Partial<TileConfig>) => void;
}) => {

    const onChangeId = (newTileConfigChanceToMutate: TileConfig['chanceToMutate']) => {
        const newTileConfig = { ...props.tileConfig }
        newTileConfig.chanceToMutate = newTileConfigChanceToMutate
        props.setTileConfig(newTileConfig)

    }

    return (
        <div>
            <h2>
                Tile  chanceToMutate
            </h2>
            <input
                type="text"
                value={props.tileConfig.chanceToMutate}
                onChange={(e) => onChangeId(e.target.valueAsNumber)}
            />
        </div>
    )
}
export default TileChanceToMutateConfigComponent;