import {NeighborConstraint} from '../../models/neighbor-constraint.model';
import {Searchable} from '../searchable/searchable.component';
import {Input} from '../../shared/input/input.component';

interface NeighborConstraintEditorProps {
    neighborConstraint: Partial<NeighborConstraint>;
    setNeighborConstraint: (newNeighborConstraint: Partial<NeighborConstraint>) => void;
}

export const NeighborConstraintEditor = ({
    neighborConstraint,
    setNeighborConstraint,
}: NeighborConstraintEditorProps) => {
    const neighborId = neighborConstraint.neighborId;
    return <section>
        <h5>
            {neighborId ? `Constraint to ${neighborId}` : 'New Neighbor Constraint'}
        </h5>
        <Searchable searchList={['neighborconstraint', 'id']}>
            <Input label="ID" value={neighborConstraint.id} disabled={true}/>
        </Searchable>
        <Searchable searchList={['neighborconstraint', 'neighborId']}>
            <Input label="Neighbor ID" value={neighborConstraint.neighborId}
                   onChange={neighborId => setNeighborConstraint({...neighborConstraint, neighborId})}/>
        </Searchable>
        <Searchable searchList={['neighborconstraint', 'minimumamount']}>
            <Input label="Minimum Amount" value={neighborConstraint.minAmount} type="number"
                   onChange={minAmount => setNeighborConstraint({...neighborConstraint, minAmount})}/>
        </Searchable>
        <Searchable searchList={['neighborconstraint', 'maximumamount']}>
            <Input label="Maximum Amount" value={neighborConstraint.maxAmount} type="number"
                   onChange={maxAmount => setNeighborConstraint({...neighborConstraint, maxAmount})}/>
        </Searchable>
        <Searchable searchList={['neighborconstraint', 'minimumdistance']}>
            <Input label="Minimum Distance" value={neighborConstraint.minimumDistance} type="number"
                   onChange={minimumDistance => setNeighborConstraint({...neighborConstraint, minimumDistance})}/>
        </Searchable>
        <Searchable searchList={['neighborconstraint', 'minimumamount']}>
            <Input label="Maximum Distance" value={neighborConstraint.maximumDistance} type="number"
                   onChange={maximumDistance => setNeighborConstraint({...neighborConstraint, maximumDistance})}/>
        </Searchable>
    </section>;
};