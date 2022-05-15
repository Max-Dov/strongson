import React from 'react';
import { useState } from 'react';
import { WorldConfig } from '../../../../models/world-config.model';
import './results-config.styles.scss';

const ResultConfigComponent = (props: {
    worldConfig: Partial<WorldConfig>
}) => {
    const worldConfig = props.worldConfig
    const stringWorldConfig = JSON.stringify(worldConfig, null, 2)

    return (
        <form>
            <textarea value={stringWorldConfig}>

            </textarea>
        </form>
    )
}

export default ResultConfigComponent;