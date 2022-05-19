import React from 'react';
import { NeighborConstraint } from '../../../../../../../models/neighbor-constraint.model';

const TileNeighborMaxAmountConfigComponent = (props: {
    tileNeighborConfig: Partial<NeighborConstraint>
    setTileNeighborConfig: (tileNeighborConfig: Partial<NeighborConstraint>) => void;
}) => {

    const onChangeNeighborMaxAmount = (newTileConfigNeighborMaxAmount: NeighborConstraint['maxAmount']) => {
        const newTileNeighborMaxAmountConfig = { ...props.tileNeighborConfig }
        newTileNeighborMaxAmountConfig.minAmount = newTileConfigNeighborMaxAmount
        props.setTileNeighborConfig(newTileNeighborMaxAmountConfig)

    }

    return (
        <div>
            <h2>
                Neighbor Tile max Amount
            </h2>
            <input
                type="text"
                value={props.tileNeighborConfig.id}
                onChange={(e) => onChangeNeighborMaxAmount(e.target.valueAsNumber)}
            />
        </div>
    )
}
export default TileNeighborMaxAmountConfigComponent;