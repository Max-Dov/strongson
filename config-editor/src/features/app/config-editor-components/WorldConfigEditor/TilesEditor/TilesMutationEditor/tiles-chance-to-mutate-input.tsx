import React from 'react';
import { TileConfig } from '../../../../../../models/tile-config.model';

const TileChanceToMutateConfigComponent = (props: {
    tileConfig: Partial<TileConfig>
    setTileConfig: (tileConfig: Partial<TileConfig>) => void;
}) => {

    const onChangechanceToMutate = (newTileConfigChanceToMutate: TileConfig['chanceToMutate']) => {
        const newTileConfig = { ...props.tileConfig }
        newTileConfig.chanceToMutate = newTileConfigChanceToMutate
        props.setTileConfig(newTileConfig)

    }

    return (
        <div>
            <h2>
                Tile  chance To Mutate
            </h2>
            <input
                type="number"
                value={props.tileConfig.chanceToMutate}
                onChange={(e) => onChangechanceToMutate(e.target.valueAsNumber)}
            />
        </div>
    )
}
export default TileChanceToMutateConfigComponent;