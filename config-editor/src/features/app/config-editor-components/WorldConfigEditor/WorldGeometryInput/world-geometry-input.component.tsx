import React from 'react';
import { WorldGeometry } from '../../../../../constants/world-geometry.model';
import { WorldConfig } from '../../../../../models/world-config.model';
import './geometry-config.styles.scss';

const GeometryConfigComponent = (props: {
    worldConfig: Partial<WorldConfig>
    setWorldConfig: (worldConfig: Partial<WorldConfig>) => void;
}) => {

    const onChangeGeometry = (newWorldConfigGeometry: WorldConfig['geometry']) => {
        const newWorldConfig = { ...props.worldConfig }
        newWorldConfig.geometry = newWorldConfigGeometry
        props.setWorldConfig(newWorldConfig)

    }

    return (
        <div className="input-group">
            <h1>
                Geometry
            </h1>
            <p>
                World tile geometry.
            </p>
            <input id="Hexagonal " name="geometry" type="radio" value={WorldGeometry.HEXAGONAL} onChange={(e) => onChangeGeometry(e.target.value as WorldGeometry)} />
            <label className="inline" >Hexagonal</label>

            <input id="Tetragonal" name="geometry" type="radio" value={WorldGeometry.TETRAGONAL} onChange={(e) => onChangeGeometry(e.target.value as WorldGeometry)} />
            <label className="inline" >Tetragonal</label>
        </div>
    )
}
export default GeometryConfigComponent;