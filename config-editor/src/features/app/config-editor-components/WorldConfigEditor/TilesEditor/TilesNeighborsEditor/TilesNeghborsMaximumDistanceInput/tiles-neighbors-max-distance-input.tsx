import React from 'react';
import { NeighborConstraint } from '../../../../../../../models/neighbor-constraint.model';

const TileNeighborMaximumDistanceConfigComponent = (props: {
    tileNeighborConfig: Partial<NeighborConstraint>
    setTileNeighborConfig: (tileConfig: Partial<NeighborConstraint>) => void;
}) => {

    const onChangeNeighborMaximumDistance = (newTileConfigNeighborMaximumDistance: NeighborConstraint['maximumDistance']) => {
        const newTileNeighborMaximumDistanceConfig = { ...props.tileNeighborConfig }
        newTileNeighborMaximumDistanceConfig.minAmount = newTileConfigNeighborMaximumDistance
        props.setTileNeighborConfig(newTileNeighborMaximumDistanceConfig)

    }

    return (
        <div>
            <h2>
                Neighbor Tile maximum Distance
            </h2>
            <input
                type="text"
                value={props.tileNeighborConfig.id}
                onChange={(e) => onChangeNeighborMaximumDistance(e.target.valueAsNumber)}
            />
        </div>
    )
}
export default TileNeighborMaximumDistanceConfigComponent;