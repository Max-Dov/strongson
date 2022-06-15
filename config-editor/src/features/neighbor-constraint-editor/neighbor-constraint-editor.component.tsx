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
    const neighborId = neighborConstraint.neighborConfigId;
    return <section className="neighbor-constraint-editor">
        <h4>
            {neighborId ? `Constraint to ${neighborId}` : 'New Neighbor Constraint'}
            <RemoveCircleButton className="remove-button" onClick={onRemove}/>
        </h4>
        <Searchable keywords={['neighborconstraint', 'id']}>
            <div className="constraint-id-label">ID</div>
            <div>{neighborConstraint.configId || 'No ID for origin tile specified yet.'}</div>
        </Searchable>
        <Searchable keywords={['neighborconstraint', 'neighborId']}>
            <Input label="Neighbor ID"
                   value={neighborConstraint.neighborConfigId}
                   className="full-width"
                   onChange={neighborId => setNeighborConstraint({...neighborConstraint, neighborConfigId: neighborId})}/>
        </Searchable>
        <Searchable keywords={['neighborconstraint', 'minamount']}>
            <Input label={<span className="constraint-label">Minimum Amount</span>}
                   className="constraint-input"
                   value={neighborConstraint.minAmount}
                   type="number"
                   onChange={minAmount => setNeighborConstraint({...neighborConstraint, minAmount})}/>
        </Searchable>
        <Searchable keywords={['neighborconstraint', 'maxamount']}>
            <Input label={<span className="constraint-label">Maximum Amount</span>}
                   className="constraint-input"
                   value={neighborConstraint.maxAmount}
                   type="number"
                   onChange={maxAmount => setNeighborConstraint({...neighborConstraint, maxAmount})}/>
        </Searchable>
        <Searchable keywords={['neighborconstraint', 'mindistance']}>
            <Input label={<span className="constraint-label">Minimum Distance</span>}
                   className="constraint-input"
                   value={neighborConstraint.minDistance}
                   type="number"
                   onChange={minDistance => setNeighborConstraint({...neighborConstraint, minDistance})}/>
        </Searchable>
        <Searchable keywords={['neighborconstraint', 'minamount']}>
            <Input label={<span className="constraint-label">Maximum Distance</span>}
                   className="constraint-input"
                   value={neighborConstraint.maxDistance}
                   type="number"
                   onChange={maxDistance => setNeighborConstraint({...neighborConstraint, maxDistance})}/>
        </Searchable>
    </section>;
};