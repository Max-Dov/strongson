import {TileRepresentation} from '@models/tile-representation.model';
import {ConfigIds} from '@constants/config-ids.enum';
import React from 'react';

const cityLvl1Default = {
    id: '0',
    configId: ConfigIds.CITY_LVL_1,
    displayName: 'Town I',
    pictureUrl: 'city-lvl-1-0.png',
    description:
        <p>
            Small but sturdy town full of <strong>workers</strong> which can do gathering,
            crop farming, scouting. Workers want to eat and don't like being eaten (by wolves).
            <br/>---<br/>
            <i>"I better be living in Towntown than being eaten by wolves in forest aight?"</i>
        </p>,
};

const forestDefault = {
    id: '0',
    configId: ConfigIds.FOREST,
    displayName: 'Forest',
    pictureUrl: 'forest-0.png',
    description:
        <p>
            Forest full of fauna and flora (<strong>wood</strong>).
            Some of its fauna is friendly, like squirrels, some of it likes to eat meat - wolves, for example.
            <br/>---<br/>
            <i>"If I would choose between dying from a squirrel or wolf - I would choose living in a Towntown
                instead."</i>
        </p>,
};

const grasslandDefault = {
    id: '0',
    configId: ConfigIds.GRASSLAND,
    displayName: 'Grassland',
    pictureUrl: 'grassland-0.png',
    description:
        <p>
            Plains with grass. Maybe tomorrow there would be forest or hills or even a castle, who knows.. So check back
            tomorrow!
            <br/>---<br/>
            <i>"That is very little grass for something called "Grassland"."</i>
        </p>,
};

const hillsDefault = {
    id: '0',
    configId: ConfigIds.HILLS,
    displayName: 'Hills',
    pictureUrl: 'hills-0.png',
    description:
        <p>
            Steep and small hills. Do dwarves actually live in those?
            <br/>---<br/>
            <i>"I don't like hills, they are too simple. I'm more into grasslands!"</i>
        </p>,
};

const shoreWaterDefault = {
    id: '0',
    configId: ConfigIds.SHORE_WATER,
    displayName: 'Water',
    pictureUrl: 'shore-water-0.png',
    description:
        <p>
            Low tide water. Stuff like water mills and sea ports may be built there!
            <br/>---<br/>
            <i>"If boat is heavier than water, then how it floats?"</i>
        </p>,
};

const mountainsDefault = {
    id: '0',
    configId: ConfigIds.MOUNTAINS,
    displayName: 'Mountains',
    pictureUrl: 'mountains-0.png',
    description:
        <p>
            Immovable mountains raising up the sky. Epic.
            <br/>---<br/>
            <i>"Taller the mountain, shorter the dwarf that lives in it."</i>
        </p>,
};

/**
 * Map of every TileConfig to its possible TileRepresentations via <configId, Array<TileRepresentation>> map.
 */
export const TILE_REPRESENTATIONS: Map<TileRepresentation['configId'], Array<TileRepresentation>> =
    new Map([
        [ConfigIds.CITY_LVL_1, [
            {...cityLvl1Default},
            {...cityLvl1Default, id: '1', pictureUrl: 'city-lvl-1-1.png'},
            {...cityLvl1Default, id: '2', pictureUrl: 'city-lvl-1-2.png'},
            {...cityLvl1Default, id: '3', pictureUrl: 'city-lvl-1-3.png'},
            {...cityLvl1Default, id: '4', pictureUrl: 'city-lvl-1-4.png'},
            {...cityLvl1Default, id: '5', pictureUrl: 'city-lvl-1-5.png'},
            {...cityLvl1Default, id: '6', pictureUrl: 'city-lvl-1-6.png'},
            {...cityLvl1Default, id: '7', pictureUrl: 'city-lvl-1-7.png'},
        ]],
        [ConfigIds.FOREST, [
            {...forestDefault},
            {...forestDefault, id: '1', pictureUrl: 'forest-1.png'},
            {...forestDefault, id: '2', pictureUrl: 'forest-2.png'},
            {...forestDefault, id: '3', pictureUrl: 'forest-3.png'},
            {...forestDefault, id: '4', pictureUrl: 'forest-4.png'},
            {...forestDefault, id: '5', pictureUrl: 'forest-5.png'},
        ]],
        [ConfigIds.GRASSLAND, [
            {...grasslandDefault},
            {...grasslandDefault, id: '1', pictureUrl: 'grassland-1.png'},
            {...grasslandDefault, id: '2', pictureUrl: 'grassland-2.png'},
            {...grasslandDefault, id: '3', pictureUrl: 'grassland-3.png'},
            {...grasslandDefault, id: '4', pictureUrl: 'grassland-4.png'},
            {...grasslandDefault, id: '5', pictureUrl: 'grassland-5.png'},
        ]],
        [ConfigIds.HILLS, [
            {...hillsDefault},
            {...hillsDefault, id: '1', pictureUrl: 'hills-1.png'},
            {...hillsDefault, id: '2', pictureUrl: 'hills-2.png'},
            {...hillsDefault, id: '3', pictureUrl: 'hills-3.png'},
            {...hillsDefault, id: '4', pictureUrl: 'hills-4.png'},
            {...hillsDefault, id: '5', pictureUrl: 'hills-5.png'},
        ]],
        [ConfigIds.SHORE_WATER, [
            {...shoreWaterDefault},
            {...shoreWaterDefault, id: '1', pictureUrl: 'shore-water-1.png'},
            {...shoreWaterDefault, id: '2', pictureUrl: 'shore-water-2.png'},
            {...shoreWaterDefault, id: '3', pictureUrl: 'shore-water-3.png'},
            {...shoreWaterDefault, id: '4', pictureUrl: 'shore-water-4.png'},
            {...shoreWaterDefault, id: '5', pictureUrl: 'shore-water-5.png'},
        ]],
        [ConfigIds.MOUNTAINS, [
            {...mountainsDefault},
            {...mountainsDefault, id: '1', pictureUrl: 'mountains-1.png'},
            {...mountainsDefault, id: '2', pictureUrl: 'mountains-2.png'},
            {...mountainsDefault, id: '3', pictureUrl: 'mountains-3.png'},
            {...mountainsDefault, id: '4', pictureUrl: 'mountains-4.png'},
            {...mountainsDefault, id: '5', pictureUrl: 'mountains-5.png'},
        ]],
    ]);