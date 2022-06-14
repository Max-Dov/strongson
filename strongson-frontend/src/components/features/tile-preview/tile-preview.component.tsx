import React from 'react';
import {TileRepresentation} from '@models/tile-representation.model';
import './tile-preview.styles.scss';

interface TilePreviewProps {
    tileRepresentations: Array<TileRepresentation>;
}

/**
 * Previews all tile info in card container.
 */
export const TilePreview = ({tileRepresentations}: TilePreviewProps) => {
    // TODO change text for every representation
    const {displayName, description, configId} = tileRepresentations[0]
    const imageUrls = tileRepresentations.map(representation => representation.pictureUrl)

    return <div className={`tile-preview ${configId}`}>
        <div className="header-container">
            <span className="tile-name">
                {displayName}
            </span>
        </div>
        <div className="tile-images">
            {imageUrls.map(imageUrl => <img alt="Card Preview" src={imageUrl} key={imageUrl}/>)}
        </div>
        <div className="tile-description">
            {description}
        </div>
    </div>;
};