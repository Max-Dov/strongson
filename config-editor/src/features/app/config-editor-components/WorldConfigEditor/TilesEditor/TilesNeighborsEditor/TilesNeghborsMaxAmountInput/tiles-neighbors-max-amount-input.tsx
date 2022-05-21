import React from 'react';
import { NeighborConstraint } from '../../../../../../../models/neighbor-constraint.model';

const TileNeighborMaxAmountConfigComponent = (props: {
    tileNeighborConfig: Partial<NeighborConstraint>
    setTileNeighborConfig: (tileNeighborConfig: Partial<NeighborConstraint>) => void;
}) => {

    const onChangeNeighborMaxAmount = (newTileConfigNeighborMaxAmount: NeighborConstraint['maxAmount']) => {
        const newTileNeighborMaxAmountConfig = { ...props.tileNeighborConfig }
        newTileNeighborMaxAmountConfig.maxAmount = newTileConfigNeighborMaxAmount
        props.setTileNeighborConfig(newTileNeighborMaxAmountConfig)

    }

    return (
        <div>
            <h2>
                Neighbor Tile max Amount
            </h2>
            <input
                type="number"
                value={props.tileNeighborConfig.maxAmount}
                onChange={(e) => onChangeNeighborMaxAmount(e.target.valueAsNumber)}
            />
        </div>
    )
}
export default TileNeighborMaxAmountConfigComponent;