import React from 'react';
import { NeighborConstraint } from '../../../../../../../models/neighbor-constraint.model';

const TileNeighborMinAmountConfigComponent = (props: {
    tileNeighborConfig: Partial<NeighborConstraint>
    setTileNeighborConfig: (tileConfig: Partial<NeighborConstraint>) => void;
}) => {

    const onChangeNeighborMinAmount = (newTileConfigNeighborMinAmount: NeighborConstraint['minAmount']) => {
        const newTileNeighborMinAmountConfig = { ...props.tileNeighborConfig }
        newTileNeighborMinAmountConfig.minAmount = newTileConfigNeighborMinAmount
        props.setTileNeighborConfig(newTileNeighborMinAmountConfig)

    }

    return (
        <div>
            <h2>
                Neighbor Tile min Amount
            </h2>
            <input
                type="number"
                value={props.tileNeighborConfig.minAmount}
                onChange={(e) => onChangeNeighborMinAmount(e.target.valueAsNumber)}
            />
        </div>
    )
}
export default TileNeighborMinAmountConfigComponent;