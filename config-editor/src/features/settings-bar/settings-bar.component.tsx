import React, {useState} from 'react';
import {SettingsButton} from '@svgs/settings-button-svg';
import './settings-bar.styles.scss';
import {SettingsSheetComponent} from '@features/settings-sheet/settings-sheet.component';


/**
 * Settings bar represented as clickable "Settings Cog" that will display settings sheet for Config Editor.
 */
export const SettingsBar = () => {
    const [areSettingsExpanded, setAreSettingsExpanded] = useState<boolean>(false);

    return <div className="settings-bar">
        <SettingsButton className={`settings-bar-button ${areSettingsExpanded ? 'expanded' : ''}`} type="button"
                        onClick={() => setAreSettingsExpanded(!areSettingsExpanded)}/>
        {areSettingsExpanded && <SettingsSheetComponent onClose={() => setAreSettingsExpanded(false)}/>}
    </div>;
};
