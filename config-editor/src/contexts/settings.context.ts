import {createContext} from 'react';

export interface ConfigEditorSettings {
    /**
     * If true, then "JSON" section should be placed below World Config.
     * If false, then "JSON" section should be placed to the right of World Config on big screen.
     */
    isJsonSectionBelowWorldConfig: boolean,
    /**
     * If true, then world tiles editor should represent tiles as rows in table.
     * If false, then tiles should be represented as tiles.
     */
    isWorldTilesEditorRepresentedAsTable: boolean,
}

export const SettingsContext = createContext<{
    settings: ConfigEditorSettings,
    setSettings: (newSettings: ConfigEditorSettings) => void
}>({
    settings: {
        isJsonSectionBelowWorldConfig: false,
        isWorldTilesEditorRepresentedAsTable: false,
    },
    setSettings: () => null
});