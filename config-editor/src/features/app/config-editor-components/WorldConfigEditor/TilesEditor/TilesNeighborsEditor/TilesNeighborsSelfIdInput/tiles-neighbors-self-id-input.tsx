import React from 'react';
import { NeighborConstraint } from '../../../../../../../models/neighbor-constraint.model';

const TileNeighborSelfIdConfigComponent = (props: {
    tileNeighborConfig: Partial<NeighborConstraint>
    setTileNeighborConfig: (tileConfig: Partial<NeighborConstraint>) => void;
}) => {

    const onChangeNeighborSelfId = (newTileConfigNeighborId: NeighborConstraint['id']) => {
        const newTileNeighborConfig = { ...props.tileNeighborConfig }
        newTileNeighborConfig.id = newTileConfigNeighborId
        props.setTileNeighborConfig(newTileNeighborConfig)

    }

    return (
        <div>
            <h2>
                Neighbor Self Tile ID
            </h2>
            <input
                type="text"
                value={props.tileNeighborConfig.id}
                onChange={(e) => onChangeNeighborSelfId(e.target.value)}
            />
        </div>
    )
}
export default TileNeighborSelfIdConfigComponent;