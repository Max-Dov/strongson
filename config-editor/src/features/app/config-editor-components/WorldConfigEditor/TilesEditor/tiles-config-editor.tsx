import React, { useState } from 'react';
import './tiles-config-editor.styles.scss';

import { TileConfig } from '../../../../../models/tile-config.model';

import TileIdConfigComponent from './TilesIdInput/tiles-id-input';
import TileMutationEditor from './TilesMutationEditor/tile-mutation-editor';
import TileNameConfigComponent from './TilesNameInput/tiles-name-input';
import TileNeighborConstraintEditor from './TilesNeighborsEditor/tiles-neighbors-config';
import TileRepresentationConfigComponent from './TilesRepresentationInput/tiles-representation-input';

const TileConfigPage = () => {

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
            <TileIdConfigComponent tileConfig={tileConfig} setTileConfig={setTileConfig} ></TileIdConfigComponent>
            <TileNameConfigComponent tileConfig={tileConfig} setTileConfig={setTileConfig} ></TileNameConfigComponent>
            <TileRepresentationConfigComponent tileConfig={tileConfig} setTileConfig={setTileConfig} ></TileRepresentationConfigComponent>
            <TileMutationEditor />
            <div className="form-field">
                {addNewTileConfig.map((_singleService, index) => (
                    <div key={index} className="services">
                        <div className="first-division">
                            <TileNeighborConstraintEditor />
                            {addNewTileConfig.length - 1 === index && (
                                <button
                                    type="button"
                                    onClick={handleServiceAdd}
                                    className="add-btn"
                                >
                                    <span>Add Neighbor</span>
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
                                    <span>Remove Neighbor</span>
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )




}
export default TileConfigPage;