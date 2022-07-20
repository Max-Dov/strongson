import {TileConfig} from '@models/tile-config.model';
import {ReactNode} from 'react';
import {NeighborConstraintEditor} from '@features/neighbor-constraint-editor/neighbor-constraint-editor.component';
import {NeighborConstraint} from '@models/neighbor-constraint.model';
import {AddHexagonButton} from '@svgs/add-hexagon-button.svg';
import './neighbors-editor.styles.scss';
import {Tooltip} from '@shared/tooltip/tooltip.component';
import React from 'react';

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
    originId?: NeighborConstraint['configId'];
}

export const NeighborsEditor = ({
    neighbors,
    setNeighbors,
    originId,
}: NeighborsEditorProps) => {
    const onAddNeighbor = () => {
        if (neighbors) {
            setNeighbors([{configId: originId}, ...neighbors]);
        } else {
            setNeighbors([{configId: originId}]);
        }
    };

    const onRemoveNeighbor = (index: number) => {
        if (neighbors) {
            const newNeighbors = [...neighbors];
            newNeighbors.splice(index, 1);
            setNeighbors(newNeighbors);
        }
    };

    const onUpdateNeighbor = (newNeighborConstraint: Partial<NeighborConstraint>, index: number) => {
        if (neighbors) {
            const newNeighbors = [...neighbors];
            newNeighbors[index] = newNeighborConstraint;
            setNeighbors(newNeighbors);
        } else {
            setNeighbors([newNeighborConstraint]);
        }
    };

    const renderNeighborConstraintEditor = (neighborConstraint: Partial<NeighborConstraint>, index: number): ReactNode =>
        <NeighborConstraintEditor
            neighborConstraint={neighborConstraint}
            setNeighborConstraint={(newNeighbor) => onUpdateNeighbor(newNeighbor, index)}
            onRemove={() => onRemoveNeighbor(index)}
        />;

    return <section className="neighbors-editor">
        <h4>
            <strong>Neighbors</strong>
            <Tooltip>
               List of neighbor constraints. Tile can exist only if all it's constraints are satisfied.<br/><br/>

               E.g.: if "Mountain" tile needs at least 5 "Hills" tiles around it,<br/>
               then that would be declared as neighbor constraint from "Hills", with prop "minAmount" equal to 5.<br/>
            </Tooltip>
            <AddHexagonButton onClick={onAddNeighbor}/>
        </h4>
        {neighbors?.map(renderNeighborConstraintEditor)}
    </section>;
};