import React from 'react';
import {TileRepresentation} from '@models/tile-representation.model';
import './tile-preview.styles.scss';

interface TilePreviewProps {
    tileRepresentation: TileRepresentation;
}

// V todo rotating bg
// V todo header bigger
// V todo dropshadow on tile
// todo game font
// todo gallery of other tile variations

/**
 * Previews all tile info in card container.
 */
export const TilePreview = ({tileRepresentation}: TilePreviewProps) => {
    const {displayName, description, representation} = tileRepresentation;
    return <div className="tile-preview">
        <div className="header-container">
            <span className="tile-name">
                {displayName}
            </span>
        </div>
        <div className="tile-representation">
            {representation.map(imageUrl => <img alt="Card Preview" src={imageUrl} key={imageUrl}/>)}
        </div>
        <div className="tile-description">
            {description}
        </div>
    </div>;
};