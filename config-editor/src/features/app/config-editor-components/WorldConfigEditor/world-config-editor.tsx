import React, { useState } from 'react';
// import './config-page.styles.scss';
import GeometryConfigComponent from './WorldGeometryInput/world-geometry-input.component'
import IdConfigComponent from './WorldIdInput/world-id-input.component';
import ResultConfigComponent from '../WorldConfigResults/world-config-results.component';
import { WorldConfig } from '../../../../models/world-config.model';
import { TileConfig } from '../../../../models/tile-config.model';
import TileNameConfigComponent from './TilesEditor/TilesNameInput/tiles-name-input';
import TileConfigPage from './TilesEditor/tiles-config-editor';

const ConfigPage = () => {


    const [worldConfig, setWorldConfig] = useState<Partial<WorldConfig>>({});
    const [tileConfig, setTileConfig] = useState<Partial<TileConfig>>({});



    const [addNewTileConfig, setaddNewTileConfig] = useState([{ service: "" }]);

    const handleServiceRemove = (index: number) => {
        const newTileConfig = [...addNewTileConfig];
        newTileConfig.splice(index, 1);
        setaddNewTileConfig(newTileConfig);
    };

    const handleServiceAdd = () => {
        setaddNewTileConfig([...addNewTileConfig, { service: "" }]);
    };

    return (
        <section className="contact-form-tiles">
            <IdConfigComponent worldConfig={worldConfig} setWorldConfig={setWorldConfig} />
            <GeometryConfigComponent worldConfig={worldConfig} setWorldConfig={setWorldConfig} />
            <div className="form-field">
                {addNewTileConfig.map((_singleService, index) => (
                    <div key={index} className="services">
                        <div className="first-division">
                            <TileConfigPage />
                            {addNewTileConfig.length - 1 === index && (
                                <button
                                    type="button"
                                    onClick={handleServiceAdd}
                                    className="add-btn"
                                >
                                    <span>Add a Tile</span>
                                </button>
                            )}
                        </div>
                        <div className="second-division">
                            {addNewTileConfig.length !== 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleServiceRemove(index)}
                                    className="remove-btn"
                                >
                                    <span>Remove Tile</span>
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <ResultConfigComponent worldConfig={worldConfig} tileConfig={tileConfig} ></ResultConfigComponent>
        </section>
    )





}
export default ConfigPage;