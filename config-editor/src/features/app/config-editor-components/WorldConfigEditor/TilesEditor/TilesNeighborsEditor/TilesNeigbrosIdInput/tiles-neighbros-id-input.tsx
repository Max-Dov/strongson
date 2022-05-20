import React from 'react';
import { NeighborConstraint } from '../../../../../../../models/neighbor-constraint.model';

const TileNeighborIdConfigComponent = (props: {
    tileNeighborConfig: Partial<NeighborConstraint>
    setTileNeighborConfig: (tileNeighborConfig: Partial<NeighborConstraint>) => void;
}) => {

    const onChangeNeighborId = (newTileConfigNeighborId: NeighborConstraint['id']) => {
        const newTileNeighborConfig = { ...props.tileNeighborConfig }
        newTileNeighborConfig.id = newTileConfigNeighborId
        props.setTileNeighborConfig(newTileNeighborConfig)

    }

    return (
        <div>
            <h2>
                Neighbor Tile ID
            </h2>
            <input
                type="text"
                value={props.tileNeighborConfig.neighborId}
                onChange={(e) => onChangeNeighborId(e.target.value)}
            />
        </div>
    )
}
export default TileNeighborIdConfigComponent;