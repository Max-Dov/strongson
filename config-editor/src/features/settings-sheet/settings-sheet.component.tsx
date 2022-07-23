import React, {useContext} from 'react';
import {SettingsContext} from '@contexts/settings.context';
import './settings-sheet.styles.scss';

interface SettingsSheetProps {
    /**
     * On "Close settings" button click callback.
     */
    onClose: () => void;
}

/**
 * Sheet with settings switches.
 */
export const SettingsSheetComponent = ({onClose}: SettingsSheetProps) => {
    const {settings, setSettings} = useContext(SettingsContext);
    const {isJsonSectionBelowWorldConfig, isWorldTilesEditorRepresentedAsTable} = settings;

    return <section className="settings-sheet">
        <h2>Settings <button onClick={onClose}><SquareCloseSvg/></button></h2>
        <p>Play with editor <strong>layout</strong>:</p>
        <div className="setting">
            <h3>"JSON" section placement</h3>
            <div className="note">(On small screen "JSON" section<br/>would always be below World Config.)</div>
            <button
                type="button"
                className={`setting-option ${isJsonSectionBelowWorldConfig ? '' : 'active'}`}
                onClick={() => setSettings({...settings, isJsonSectionBelowWorldConfig: false})}
            >
                <SideBySideColumnsSvg/>: To the right of World Config
            </button>
            <button
                type="button"
                className={`setting-option ${isJsonSectionBelowWorldConfig ? 'active' : ''}`}
                onClick={() => setSettings({...settings, isJsonSectionBelowWorldConfig: true})}
            >
                <OneUnderAnotherRowsSvg/>: Below World Config
            </button>
        </div>

        <div className="setting">
            <h3>"World Tiles" editor layout</h3>
            <button
                type="button"
                className={`setting-option ${isWorldTilesEditorRepresentedAsTable ? '' : 'active'}`}
                onClick={() => setSettings({...settings, isWorldTilesEditorRepresentedAsTable: false})}
            >
                <CardsLayoutSvg/>: Cards
            </button>
            <button
                type="button"
                className={`setting-option ${isWorldTilesEditorRepresentedAsTable ? 'active' : ''}`}
                onClick={() => setSettings({...settings, isWorldTilesEditorRepresentedAsTable: true})}
            >
                <TableLayoutSvg/>: Table
            </button>
        </div>
    </section>;
};

/**
 * SVGs used in settings sheet.
 */

const SideBySideColumnsSvg = () =>
    <svg xmlns="http://www.w3.org/2000/svg" width="1em"
         height="1em" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round"
         strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <rect x="4" y="4" width="16" height="16" rx="2"/>
        <line x1="12" y1="4" x2="12" y2="20"/>
    </svg>;

const OneUnderAnotherRowsSvg = () =>
    <svg xmlns="http://www.w3.org/2000/svg" width="1em"
         height="1em" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round"
         strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <rect x="4" y="4" width="16" height="16" rx="2"/>
        <line x1="4" y1="12" x2="20" y2="12"/>
    </svg>;

const CardsLayoutSvg = () =>
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
         viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round"
         strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <rect x="4" y="4" width="6" height="5" rx="2"/>
        <rect x="4" y="13" width="6" height="7" rx="2"/>
        <rect x="14" y="4" width="6" height="7" rx="2"/>
        <rect x="14" y="15" width="6" height="5" rx="2"/>
    </svg>;

const TableLayoutSvg = () =>
    <svg width="1em" height="1em" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z"
            stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 16.5H21" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 12H21" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M21 7.5H3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 21V3" stroke="currentColor" strokeWidth="1.5"/>
    </svg>;

const SquareCloseSvg = () =>
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none"
         stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
    </svg>;