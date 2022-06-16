import {Tile as TileModel} from '@models/tile.model';
import {TileRepresentation} from '@models/tile-representation.model';
import {TILE_REPRESENTATIONS} from '@constants/tile-representations.const';

/**
 * Figures out tile representation based on configId and representationId.
 * If representation can not be found by representationId, list of representations is found by configId,
 * then random representation from a list would be chosen.
 */
export const getTileRepresentation = (configId: TileModel['configId'], representationId: TileModel['representationId']): TileRepresentation | null => {
    const representations = TILE_REPRESENTATIONS.get(configId);
    if (!representations) return null;
    let representation = representations.find(representation => representation.id === representationId);
    if (!representation) {
        representation = representations[Math.trunc(Math.random() * representations.length)];
    }
    return representation;
};