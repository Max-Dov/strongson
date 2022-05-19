import React from 'react';
import { NeighborConstraint } from '../../../../../../../models/neighbor-constraint.model';

const TileNeighborMinimumDistanceConfigComponent = (props: {
    tileNeighborConfig: Partial<NeighborConstraint>
    setTileNeighborConfig: (tileNeighborConfig: Partial<NeighborConstraint>) => void;
}) => {

    const onChangeNeighborMinimumDistance = (newTileConfigNeighborMinimumDistance: NeighborConstraint['minimumDistance']) => {
        const newTileNeighborMinimumDistanceConfig = { ...props.tileNeighborConfig }
        newTileNeighborMinimumDistanceConfig.minimumDistance = newTileConfigNeighborMinimumDistance
        props.setTileNeighborConfig(newTileNeighborMinimumDistanceConfig)

    }

    return (
        <div>
            <h2>
                Neighbor Tile min Distance
            </h2>
            <input
                type="text"
                value={props.tileNeighborConfig.id}
                onChange={(e) => onChangeNeighborMinimumDistance(e.target.valueAsNumber)}
            />
        </div>
    )
}
export default TileNeighborMinimumDistanceConfigComponent;