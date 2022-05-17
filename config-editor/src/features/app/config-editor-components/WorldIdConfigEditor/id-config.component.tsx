import React from 'react';
import { WorldConfig } from '../../../../models/world-config.model';
import './id-config.styles.scss';

const IdConfigComponent = (props: {
    worldConfig: Partial<WorldConfig>
    setWorldConfig: (worldConfig: Partial<WorldConfig>) => void;
}) => {

    const onChangeId = (newWorldConfigId: WorldConfig['id']) => {
        const newWorldConfig = { ...props.worldConfig }
        newWorldConfig.id = newWorldConfigId
        props.setWorldConfig(newWorldConfig)

    }

    return (
        <div>
            <h2>
                ID
            </h2>
            <input
                type="text"
                value={props.worldConfig.id}
                onChange={(e) => onChangeId(e.target.value)}
            />
        </div>
    )
}
export default IdConfigComponent;