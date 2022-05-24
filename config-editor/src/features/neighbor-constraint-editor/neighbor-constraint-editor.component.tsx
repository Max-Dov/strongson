import {NeighborConstraint} from '../../models/neighbor-constraint.model';
import {Searchable} from '../searchable/searchable.component';
import {Input} from '../../shared/input/input.component';
import './neighbor-constraint-editor.styles.scss';
import {RemoveCircleButton} from '../../svgs/remove-circle-button.svg';

interface NeighborConstraintEditorProps {
    neighborConstraint: Partial<NeighborConstraint>;
    setNeighborConstraint: (newNeighborConstraint: Partial<NeighborConstraint>) => void;
    onRemove: () => void;
}

export const NeighborConstraintEditor = ({
    neighborConstraint,
    setNeighborConstraint,
    onRemove,
}: NeighborConstraintEditorProps) => {
    const neighborId = neighborConstraint.neighborId;
    return <section className="neighbor-constraint-editor">
        <h4>
            {neighborId ? `Constraint to ${neighborId}` : 'New Neighbor Constraint'}
            <RemoveCircleButton className="remove-button" onClick={onRemove}/>
        </h4>
        <Searchable searchList={['neighborconstraint', 'id']}>
            <div className="constraint-id-label">ID</div>
            <div>{neighborConstraint.id}</div>
        </Searchable>
        <Searchable searchList={['neighborconstraint', 'neighborId']}>
            <Input label="Neighbor ID"
                   value={neighborConstraint.neighborId}
                   className="full-width"
                   onChange={neighborId => setNeighborConstraint({...neighborConstraint, neighborId})}/>
        </Searchable>
        <Searchable searchList={['neighborconstraint', 'minimumamount']}>
            <Input label={<span className="constraint-label">Minimum Amount</span>}
                   className="constraint-input"
                   value={neighborConstraint.minAmount}
                   type="number"
                   onChange={minAmount => setNeighborConstraint({...neighborConstraint, minAmount})}/>
        </Searchable>
        <Searchable searchList={['neighborconstraint', 'maximumamount']}>
            <Input label={<span className="constraint-label">Maximum Amount</span>}
                   className="constraint-input"
                   value={neighborConstraint.maxAmount}
                   type="number"
                   onChange={maxAmount => setNeighborConstraint({...neighborConstraint, maxAmount})}/>
        </Searchable>
        <Searchable searchList={['neighborconstraint', 'minimumdistance']}>
            <Input label={<span className="constraint-label">Minimum Distance</span>}
                   className="constraint-input"
                   value={neighborConstraint.minimumDistance}
                   type="number"
                   onChange={minimumDistance => setNeighborConstraint({...neighborConstraint, minimumDistance})}/>
        </Searchable>
        <Searchable searchList={['neighborconstraint', 'minimumamount']}>
            <Input label={<span className="constraint-label">Maximum Distance</span>}
                   className="constraint-input"
                   value={neighborConstraint.maximumDistance}
                   type="number"
                   onChange={maximumDistance => setNeighborConstraint({...neighborConstraint, maximumDistance})}/>
        </Searchable>
    </section>;
};