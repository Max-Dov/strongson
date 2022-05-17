import React, { useState } from 'react';
import './config-page.styles.scss';
import GeometryConfigComponent from '../WorldGeometryConfigEditor/geometry-config.component'
import IdConfigComponent from '../WorldIdConfigEditor/id-config.component';
import ResultConfigComponent from '../config-results/results-config.component';
import { WorldConfig } from '../../../../models/world-config.model';

const ConfigPage = () => {


    const [worldConfig, setWorldConfig] = useState<Partial<WorldConfig>>({});


    return (
        <section className="contact-form">
            <IdConfigComponent worldConfig={worldConfig} setWorldConfig={setWorldConfig} />
            <GeometryConfigComponent worldConfig={worldConfig} setWorldConfig={setWorldConfig} />
            <ResultConfigComponent worldConfig={worldConfig}></ResultConfigComponent>
        </section>
    )





}
export default ConfigPage;