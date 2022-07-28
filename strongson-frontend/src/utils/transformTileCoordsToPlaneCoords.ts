import {Tile as TileModel} from '@models/tile.model';
import {TileShape} from '@constants/tile-shape.model';

const sin30 = Math.sin(Math.PI / 6)
const cos30 = Math.cos(Math.PI / 6)

/**
 * Transform tile game coordinates to three.js plane coordinates.
 */
export const transformTileCoordsToPlaneCoords = (tileCoordinates: TileModel<TileShape.HEXAGONAL>['coordinates']): [number, number, number] => {
    const [x, y, z] = tileCoordinates;

    return [
        x - (y + z) * sin30,
        (z - y) * cos30,
        y - z // could be 0, but since map would not rotate across XY axes it would be good to have proper "z-index" for tiles
    ]
}