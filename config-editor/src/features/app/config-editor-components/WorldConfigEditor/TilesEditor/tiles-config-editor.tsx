import React, { useState } from 'react';
import './tiles-config-editor.styles.scss';

import { TileConfig } from '../../../../../models/tile-config.model';

import TileIdConfigComponent from './TilesIdInput/tiles-id-input';
import TileMutationEditor from './TilesMutationEditor/tile-mutation-editor';
import TileRepresentationConfigComponent from './TilesRepresentationInput/tiles-representation-input';
import TileNameConfigComponent from './TilesNameInput/tiles-name-input';
import TileNeighborConstraintEditor from './TilesNeighborsEditor/tiles-neighbors-config';

const TileConfigPage = () => {

    const [tileConfig, setTileConfig] = useState<Partial<TileConfig>>({});

    const [addNewTileService, setaddNewTileService] = useState([{ service: "" }]);

    const handleServiceRemove = (index: number) => {
        const newTileConfig = [...addNewTileService];
        newTileConfig.splice(index, 1);
        setaddNewTileService(newTileConfig);
    };

    const handleServiceAdd = () => {
        setaddNewTileService([...addNewTileService, { service: "" }]);
    };

    return (
        <section className="contact-form-tiles">
            <div className="form-field">
                {addNewTileService.map((_singleService, index) => (
                    <div key={index} className="services">
                        <div className="first-division">
                            <TileIdConfigComponent tileConfig={tileConfig} setTileConfig={setTileConfig} ></TileIdConfigComponent>
                            <TileNameConfigComponent tileConfig={tileConfig} setTileConfig={setTileConfig} ></TileNameConfigComponent>
                            <TileRepresentationConfigComponent tileConfig={tileConfig} setTileConfig={setTileConfig} ></TileRepresentationConfigComponent>
                            <TileMutationEditor />
                            <TileNeighborConstraintEditor />
                            {addNewTileService.length - 1 === index && (
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
                            {addNewTileService.length !== 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleServiceRemove(index)}
                                    className="remove-btn"
                                >
                                    <span>Remove</span>
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