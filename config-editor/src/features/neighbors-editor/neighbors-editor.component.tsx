import {TileConfig} from '../../models/tile-config.model';
import {ReactNode} from 'react';
import {NeighborConstraintEditor} from '../neighbor-constraint-editor/neighbor-constraint-editor.component';
import {NeighborConstraint} from '../../models/neighbor-constraint.model';

type Neighbor = Partial<TileConfig['neighbors'][number]>

interface NeighborsEditorProps {
    /**
     * Neighbors to edit.
     */
    neighbors?: Array<Neighbor>;
    /**
     * Callback to call once neighbors are updated.
     */
    setNeighbors: (neighbors: Array<Neighbor>) => void;
    /**
     * Origin tile ID that has neighbors.
     */
    originId?: NeighborConstraint['id'];
}

export const NeighborsEditor = ({
    neighbors,
    setNeighbors,
    originId,
}: NeighborsEditorProps) => {
    const onAddNeighbor = () => {
        if (neighbors) {
            setNeighbors([{id: originId}, ...neighbors]);
        } else {
            setNeighbors([{id: originId}]);
        }
    };

    const renderNeighborConstraintEditor = (neighborConstraint: Partial<NeighborConstraint>, index: number): ReactNode =>
        <NeighborConstraintEditor
            neighborConstraint={neighborConstraint}
            setNeighborConstraint={newNeighborConstraint => {
                if (neighbors) {
                    const newNeighbors = [...neighbors];
                    newNeighbors[index] = newNeighborConstraint;
                    setNeighbors(newNeighbors);
                } else {
                    setNeighbors([newNeighborConstraint]);
                }
            }}
        />;

    return <section>
        <h4>
            Tile Constraints
        </h4>
        <button onClick={onAddNeighbor}>Add neighbor constraint</button>
        {neighbors?.map(renderNeighborConstraintEditor)}
    </section>;
};