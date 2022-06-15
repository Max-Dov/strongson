import {World} from '@models/world.model';
import {TileShape} from '@constants/tile-shape.model';

export const STRONGSON_WORLD: any = {
    "configId": "Strongson v0.1",
    "seed": 123123123,
    "epoch": 0,
    "tileShape": "HEXAGONAL",
    "dimensions": [
        10,
        10,
        10
    ],
    "tiles": {
        "0,0,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                0,
                0,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "1,0,0": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                1,
                0,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "1,0,1": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                1,
                0,
                1
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,0,1": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                0,
                1
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,1,1": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                1,
                1
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,1,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                1,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "1,1,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                1,
                1,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "2,0,0": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                2,
                0,
                0
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "2,0,1": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                2,
                0,
                1
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "2,0,2": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                2,
                0,
                2
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "1,0,2": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                1,
                0,
                2
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,0,2": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                0,
                0,
                2
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "0,1,2": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                1,
                2
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,2,2": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                2,
                2
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,2,1": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                2,
                1
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,2,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                0,
                2,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "1,2,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                1,
                2,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "2,2,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                2,
                2,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "2,1,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                2,
                1,
                0
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "3,0,0": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                3,
                0,
                0
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "3,0,1": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                3,
                0,
                1
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "3,0,2": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                3,
                0,
                2
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "3,0,3": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                3,
                0,
                3
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "2,0,3": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                2,
                0,
                3
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "1,0,3": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                1,
                0,
                3
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,0,3": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                0,
                0,
                3
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,1,3": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                1,
                3
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,2,3": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                0,
                2,
                3
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,3,3": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                3,
                3
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,3,2": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                3,
                2
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,3,1": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                0,
                3,
                1
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "0,3,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                3,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "1,3,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                1,
                3,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "2,3,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                2,
                3,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "3,3,0": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                3,
                3,
                0
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "3,2,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                3,
                2,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "3,1,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                3,
                1,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "4,0,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                4,
                0,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "4,0,1": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                4,
                0,
                1
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "4,0,2": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                4,
                0,
                2
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "4,0,3": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                4,
                0,
                3
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "4,0,4": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                4,
                0,
                4
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "3,0,4": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                3,
                0,
                4
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "2,0,4": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                2,
                0,
                4
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "1,0,4": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                1,
                0,
                4
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,0,4": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                0,
                4
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,1,4": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                1,
                4
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,2,4": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                2,
                4
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,3,4": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                3,
                4
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,4,4": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                0,
                4,
                4
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,4,3": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                4,
                3
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,4,2": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                4,
                2
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,4,1": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                4,
                1
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,4,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                4,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "1,4,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                1,
                4,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "2,4,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                2,
                4,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "3,4,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                3,
                4,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "4,4,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                4,
                4,
                0
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "4,3,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                4,
                3,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "4,2,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                4,
                2,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "4,1,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                4,
                1,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "5,0,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                5,
                0,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "5,0,1": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                5,
                0,
                1
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "5,0,2": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                5,
                0,
                2
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "5,0,3": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                5,
                0,
                3
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "5,0,4": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                5,
                0,
                4
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "5,0,5": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                5,
                0,
                5
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "4,0,5": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                4,
                0,
                5
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "3,0,5": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                3,
                0,
                5
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "2,0,5": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                2,
                0,
                5
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "1,0,5": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                1,
                0,
                5
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,0,5": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                0,
                0,
                5
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,1,5": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                1,
                5
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,2,5": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                0,
                2,
                5
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,3,5": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                3,
                5
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,4,5": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                0,
                4,
                5
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,5,5": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                0,
                5,
                5
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,5,4": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                5,
                4
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,5,3": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                5,
                3
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,5,2": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                5,
                2
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,5,1": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                5,
                1
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,5,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                5,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "1,5,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                1,
                5,
                0
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "2,5,0": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                2,
                5,
                0
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "3,5,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                3,
                5,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "4,5,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                4,
                5,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "5,5,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                5,
                5,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "5,4,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                5,
                4,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "5,3,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                5,
                3,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "5,2,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                5,
                2,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "5,1,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                5,
                1,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "6,0,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                6,
                0,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "6,0,1": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                6,
                0,
                1
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "6,0,2": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                6,
                0,
                2
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "6,0,3": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                6,
                0,
                3
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "6,0,4": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                6,
                0,
                4
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "6,0,5": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                6,
                0,
                5
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "6,0,6": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                6,
                0,
                6
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "5,0,6": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                5,
                0,
                6
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "4,0,6": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                4,
                0,
                6
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "3,0,6": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                3,
                0,
                6
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "2,0,6": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                2,
                0,
                6
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "1,0,6": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                1,
                0,
                6
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,0,6": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                0,
                0,
                6
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,1,6": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                1,
                6
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "0,2,6": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                2,
                6
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,3,6": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                3,
                6
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,4,6": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                0,
                4,
                6
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,5,6": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                5,
                6
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,6,6": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                6,
                6
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,6,5": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                6,
                5
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,6,4": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                0,
                6,
                4
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,6,3": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                6,
                3
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "0,6,2": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                6,
                2
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "0,6,1": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                6,
                1
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "0,6,0": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                6,
                0
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "1,6,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                1,
                6,
                0
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "2,6,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                2,
                6,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "3,6,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                3,
                6,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "4,6,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                4,
                6,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "5,6,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                5,
                6,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "6,6,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                6,
                6,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "6,5,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                6,
                5,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "6,4,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                6,
                4,
                0
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "6,3,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                6,
                3,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "6,2,0": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                6,
                2,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "6,1,0": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                6,
                1,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "7,0,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                7,
                0,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "7,0,1": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                7,
                0,
                1
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "7,0,2": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                7,
                0,
                2
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "7,0,3": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                7,
                0,
                3
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "7,0,4": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                7,
                0,
                4
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "7,0,5": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                7,
                0,
                5
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "7,0,6": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                7,
                0,
                6
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "7,0,7": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                7,
                0,
                7
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "6,0,7": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                6,
                0,
                7
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "5,0,7": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                5,
                0,
                7
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "4,0,7": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                4,
                0,
                7
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "3,0,7": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                3,
                0,
                7
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "2,0,7": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                2,
                0,
                7
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "1,0,7": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                1,
                0,
                7
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,0,7": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                0,
                0,
                7
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,1,7": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                1,
                7
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,2,7": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                2,
                7
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,3,7": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                0,
                3,
                7
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,4,7": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                4,
                7
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,5,7": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                5,
                7
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,6,7": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                6,
                7
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,7,7": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                0,
                7,
                7
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,7,6": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                7,
                6
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,7,5": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                7,
                5
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,7,4": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                0,
                7,
                4
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,7,3": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                7,
                3
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,7,2": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                0,
                7,
                2
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,7,1": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                7,
                1
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,7,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                7,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "1,7,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                1,
                7,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "2,7,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                2,
                7,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "3,7,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                3,
                7,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "4,7,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                4,
                7,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "5,7,0": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                5,
                7,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "6,7,0": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                6,
                7,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "7,7,0": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                7,
                7,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "7,6,0": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                7,
                6,
                0
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "7,5,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                7,
                5,
                0
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "7,4,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                7,
                4,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "7,3,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                7,
                3,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "7,2,0": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                7,
                2,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "7,1,0": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                7,
                1,
                0
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "8,0,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                8,
                0,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "8,0,1": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                8,
                0,
                1
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "8,0,2": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                8,
                0,
                2
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "8,0,3": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                8,
                0,
                3
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "8,0,4": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                8,
                0,
                4
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "8,0,5": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                8,
                0,
                5
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "8,0,6": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                8,
                0,
                6
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "8,0,7": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                8,
                0,
                7
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "8,0,8": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                8,
                0,
                8
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "7,0,8": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                7,
                0,
                8
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "6,0,8": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                6,
                0,
                8
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "5,0,8": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                5,
                0,
                8
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "4,0,8": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                4,
                0,
                8
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "3,0,8": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                3,
                0,
                8
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "2,0,8": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                2,
                0,
                8
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "1,0,8": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                1,
                0,
                8
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,0,8": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                0,
                0,
                8
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,1,8": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                0,
                1,
                8
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "0,2,8": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                2,
                8
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,3,8": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                3,
                8
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,4,8": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                4,
                8
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,5,8": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                5,
                8
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,6,8": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                6,
                8
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,7,8": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                7,
                8
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,8,8": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                8,
                8
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,8,7": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                8,
                7
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,8,6": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                8,
                6
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,8,5": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                8,
                5
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,8,4": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                8,
                4
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,8,3": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                0,
                8,
                3
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,8,2": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                0,
                8,
                2
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,8,1": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                0,
                8,
                1
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,8,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                8,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "1,8,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                1,
                8,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "2,8,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                2,
                8,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "3,8,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                3,
                8,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "4,8,0": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                4,
                8,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "5,8,0": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                5,
                8,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "6,8,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                6,
                8,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "7,8,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                7,
                8,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "8,8,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                8,
                8,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "8,7,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                8,
                7,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "8,6,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                8,
                6,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "8,5,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                8,
                5,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "8,4,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                8,
                4,
                0
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "8,3,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                8,
                3,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "8,2,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                8,
                2,
                0
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "8,1,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                8,
                1,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "9,0,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                9,
                0,
                0
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "9,0,1": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                9,
                0,
                1
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "9,0,2": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                9,
                0,
                2
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "9,0,3": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                9,
                0,
                3
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "9,0,4": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                9,
                0,
                4
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "9,0,5": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                9,
                0,
                5
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "9,0,6": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                9,
                0,
                6
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "9,0,7": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                9,
                0,
                7
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "9,0,8": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                9,
                0,
                8
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "9,0,9": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                9,
                0,
                9
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "8,0,9": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                8,
                0,
                9
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "7,0,9": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                7,
                0,
                9
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "6,0,9": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                6,
                0,
                9
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "5,0,9": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                5,
                0,
                9
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "4,0,9": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                4,
                0,
                9
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "3,0,9": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                3,
                0,
                9
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "2,0,9": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                2,
                0,
                9
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "1,0,9": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                1,
                0,
                9
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,0,9": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                0,
                9
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "0,1,9": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                0,
                1,
                9
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "0,2,9": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                2,
                9
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,3,9": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                3,
                9
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,4,9": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                4,
                9
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,5,9": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                0,
                5,
                9
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,6,9": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                6,
                9
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "0,7,9": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                0,
                7,
                9
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,8,9": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                8,
                9
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,9,9": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                9,
                9
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,9,8": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                9,
                8
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,9,7": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                9,
                7
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,9,6": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                0,
                9,
                6
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,9,5": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                9,
                5
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,9,4": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                9,
                4
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,9,3": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                9,
                3
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "0,9,2": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                9,
                2
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "0,9,1": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                0,
                9,
                1
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "0,9,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                0,
                9,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "1,9,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                1,
                9,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "2,9,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                2,
                9,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "3,9,0": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                3,
                9,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "4,9,0": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                4,
                9,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "5,9,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                5,
                9,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "6,9,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                6,
                9,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "7,9,0": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                7,
                9,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "8,9,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                8,
                9,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "9,9,0": {
            "configId": "forest",
            "representationId": "",
            "coordinates": [
                9,
                9,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "9,8,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                9,
                8,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "9,7,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                9,
                7,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "9,6,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                9,
                6,
                0
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "9,5,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                9,
                5,
                0
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "9,4,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                9,
                4,
                0
            ],
            "chanceToMutate": 7,
            "birthEpoch": 0
        },
        "9,3,0": {
            "configId": "grassland",
            "representationId": "",
            "coordinates": [
                9,
                3,
                0
            ],
            "chanceToMutate": 50,
            "birthEpoch": 0
        },
        "9,2,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                9,
                2,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        },
        "9,1,0": {
            "configId": "city-lvl-1",
            "representationId": "",
            "coordinates": [
                9,
                1,
                0
            ],
            "chanceToMutate": 0,
            "birthEpoch": 0
        }
    }
}