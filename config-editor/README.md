# 🧱 Strongson Config Editor

Utility to configure worlds (represented as JSON files) for Strongson via UI.

![Config Editor Preview](./readme-preview-editor.png "Config Editor Preview")

## Address
Latest stable version is available at: https://strongson-config-editor.surge.sh

<details> 
  <summary>Test config to play around:</summary>

```JSON
{
  "tileShape": "HEXAGONAL",
  "id": "Strongson v1.6 - baboon",
  "tiles": [
    {
      "id": "grassland",
      "representationsIds": [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5"
      ],
      "mutationChance": 1,
      "mutationWeight": 1
    },
    {
      "id": "hills",
      "neighbors": [
        {
          "configId": "hills",
          "neighborConfigId": "city-lvl-1",
          "maxAmount": 0,
          "maxDistance": 10
        },
        {
          "configId": "hills",
          "neighborConfigId": "hills",
          "maxAmount": 10,
          "maxDistance": 20
        }
      ],
      "representationsIds": [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5"
      ],
      "mutationChance": 1,
      "mutationWeight": 2,
      "mutationWeightMultiplier": 3,
      "mutationWeightMultiplierRadius": 3,
      "minAge": 5
    },
    {
      "id": "forest",
      "neighbors": [
        {
          "configId": "forest",
          "neighborConfigId": "city-lvl-1",
          "maxAmount": 0,
          "maxDistance": 5
        },
        {
          "configId": "forest",
          "neighborConfigId": "forest",
          "maxAmount": 40,
          "maxDistance": 15
        }
      ],
      "representationsIds": [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5"
      ],
      "mutationChance": 1,
      "mutationWeight": 2,
      "mutationWeightMultiplier": 3,
      "mutationWeightMultiplierRadius": 3,
      "minAge": 5
    },
    {
      "id": "city-lvl-1",
      "neighbors": [
        {
          "configId": "city-lvl-1",
          "neighborConfigId": "city-lvl-1",
          "maxAmount": 15,
          "maxDistance": 30
        },
        {
          "configId": "city-lvl-1",
          "neighborConfigId": "mountain",
          "maxDistance": 3,
          "maxAmount": 0
        },
        {
          "configId": "city-lvl-1",
          "neighborConfigId": "hills",
          "maxAmount": 0,
          "maxDistance": 5
        },
        {
          "configId": "city-lvl-1",
          "neighborConfigId": "forest",
          "maxAmount": 0,
          "maxDistance": 5
        }
      ],
      "representationsIds": [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "mutationChance": 1,
      "mutationWeight": 5,
      "mutationWeightMultiplier": 3,
      "mutationWeightMultiplierRadius": 1,
      "mutationChanceMultiplier": 2,
      "mutationChanceMultiplierRadius": 1,
      "maxAge": 8
    },
    {
      "id": "shore-water",
      "neighbors": [
        {
          "configId": "shore-water",
          "neighborConfigId": "mountains",
          "maxAmount": 0,
          "maxDistance": 3
        },
        {
          "configId": "shore-water",
          "maxAmount": 30,
          "maxDistance": 20,
          "neighborConfigId": "shore-water"
        }
      ],
      "mutationChance": 1,
      "minAge": 10,
      "mutationWeight": 2,
      "mutationChanceMultiplier": 5,
      "mutationChanceMultiplierRadius": 1,
      "representationsIds": [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5"
      ],
      "mutationWeightMultiplier": 3,
      "mutationWeightMultiplierRadius": 3
    },
    {
      "id": "mountains",
      "neighbors": [
        {
          "configId": "mountains",
          "neighborConfigId": "hills",
          "minAmount": 3,
          "maxDistance": 1
        }
      ],
      "mutationChance": 1,
      "minAge": 20,
      "mutationWeight": 30,
      "mutationChanceMultiplier": 3,
      "mutationChanceMultiplierRadius": 2,
      "representationsIds": [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5"
      ]
    }
  ]
}
```

</details>


## Features
* 2 way-data-binding: changes in input fields are instantly reflected on JSON and vice-versa.
* Search by config fields; saves some time scrolling.

## Development
To start dev server, run `npm run start` in Config Editor root directory:
```
cd config-editor
npm run start
```

To build production build, run `npm run build` in Config Editor root directory:
```
cd config-editor
npm run build
```

## Technologies used

* [TypeScript](https://www.typescriptlang.org/) - programming language;
* [React](https://reactjs.org/) - library to build UIs;
* [Sass](https://sass-lang.com/) - CSS processor;
