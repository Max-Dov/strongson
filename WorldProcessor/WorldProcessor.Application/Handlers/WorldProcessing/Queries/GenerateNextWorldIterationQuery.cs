using MediatR;
using System.ComponentModel.DataAnnotations;
using WorldProcessor.Application.Handlers.WorldProcessing.Dto;

namespace WorldProcessor.Application.Handlers.WorldProcessing.Queries
{
    public record GenerateNextWorldIterationQuery : IRequest<WorldDto>
    {
        public WorldDto World { get; init; }

        public WorldConfigDto WorldConfig { get; init; }

        public GenerateNextWorldIterationQuery(WorldDto world, WorldConfigDto config)
        {
            ValidateWorld(world);
            ValidateWorldConfig(config);

            World = world;
            WorldConfig = config;
        }

        private void ValidateWorld(WorldDto world)
        {
            foreach(var tile in world.Tiles)
            {
                if(tile.Key.Split(',').Count() != 3)
                {
                    throw new ValidationException($"Tile on position {tile.Key}. Invalid coordinates amount.");
                }
            }
        }

        private void ValidateWorldConfig(WorldConfigDto config)
        {
            foreach(var tileConfig in config.Tiles)
            {
                if (tileConfig.MinAge != 0 &&
                    tileConfig.MaxAge != 0 &&
                    tileConfig.MaxAge < tileConfig.MinAge)
                {
                    throw new ValidationException($"Tile with configId {tileConfig.Id}. MinAge > MaxAge");
                }

                ValidateNeighbourConstraints(tileConfig);
            }
        }

        private void ValidateNeighbourConstraints(TileConfigDto config)
        {
            if(config.Neighbors is not null)
            {
                foreach (var constraint in config.Neighbors)
                {
                    if (constraint.MinDistance != 0 &&
                        constraint.MaxDistance != 0 &&
                        constraint.MinDistance > constraint.MaxDistance)
                    {
                        throw new ValidationException($"Tile with configId {config.Id}. " +
                            $"Neigbour with NeighborConfigId {constraint.NeighborConfigId}. " +
                            $"MinDistance > MaxDistance");
                    }

                    if (constraint.MinAmount != 0 &&
                        constraint.MaxAmount != 0 &&
                        constraint.MinAmount > constraint.MaxAmount)
                    {
                        throw new ValidationException($"Tile with configId {config.Id}. " +
                            $"Neigbour with NeighborConfigId {constraint.NeighborConfigId}. " +
                            $"MinAmount > MaxAmount");
                    }
                }
            }
        }
    }
}