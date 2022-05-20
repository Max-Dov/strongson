import React, { useState } from 'react';
import './tiles-config-editor.styles.scss';

import { TileConfig } from '../../../../../models/tile-config.model';

import TileIdConfigComponent from './TilesIdInput/tiles-id-input';
import TileMutationEditor from './TilesMutationEditor/tile-mutation-editor';
import TileNameConfigComponent from './TilesNameInput/tiles-name-input';
import TileNeighborConstraintEditor from './TilesNeighborsEditor/tiles-neighbors-config';
import TileRepresentationConfigComponent from './TilesRepresentationInput/tiles-representation-input';
import TileChanceToMutateConfigComponent from './TilesMutationEditor/tiles-chance-to-mutate-input';
import TileMutationMagnitudeConfigComponent from './TilesMutationEditor/tiles-mutation-magnitude-input';
import TileMutationMagnitudeRadiusConfigComponent from './TilesMutationEditor/tiles-mutation-magnitude-radius-input';
import TileMutationWeightConfigComponent from './TilesMutationEditor/tiles-mutation-weight-input';

const TileConfigPage = () => {

    const [tileConfig, setTileConfig] = useState<Partial<TileConfig>>({});

    const [addNewTile, setaddNewTile] = useState([{ addNewTileService: "" }]);

    const handleaddNewTileServiceRemove = (index: number) => {
        const list = [...addNewTile];
        list.splice(index, 1);
        setaddNewTile(list);
    };

    const handleaddNewTileServiceAdd = () => {
        setaddNewTile([...addNewTile, { addNewTileService: "" }]);
    };


    return (
        <section className="contact-form-tiles">





            <div className="form-field">
                <label htmlFor="addNewTileService">add New Tile</label>
                {addNewTile.map((singleaddNewTileService, index) => (
                    <div key={index} className="addNewTileServices">
                        <div className="first-division">
                            <TileIdConfigComponent tileConfig={tileConfig} setTileConfig={setTileConfig} ></TileIdConfigComponent>
                            <TileNameConfigComponent tileConfig={tileConfig} setTileConfig={setTileConfig} ></TileNameConfigComponent>
                            <TileRepresentationConfigComponent tileConfig={tileConfig} setTileConfig={setTileConfig} ></TileRepresentationConfigComponent>
                            <TileChanceToMutateConfigComponent tileConfig={tileConfig} setTileConfig={setTileConfig} ></TileChanceToMutateConfigComponent>
                            <TileMutationMagnitudeConfigComponent tileConfig={tileConfig} setTileConfig={setTileConfig} ></TileMutationMagnitudeConfigComponent>
                            <TileMutationMagnitudeRadiusConfigComponent tileConfig={tileConfig} setTileConfig={setTileConfig} ></TileMutationMagnitudeRadiusConfigComponent>
                            <TileMutationWeightConfigComponent tileConfig={tileConfig} setTileConfig={setTileConfig} ></TileMutationWeightConfigComponent>
                            <TileNeighborConstraintEditor />
                            {addNewTile.length - 1 === index && (
                                <button
                                    type="button"
                                    onClick={handleaddNewTileServiceAdd}
                                    className="add-btn"
                                >
                                    <span>Add a Tile</span>
                                </button>
                            )}
                        </div>
                        <div className="second-division">
                            {addNewTile.length !== 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleaddNewTileServiceRemove(index)}
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