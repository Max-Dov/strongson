using MediatR;
using System.ComponentModel.DataAnnotations;
using WorldProcessor.Application.Handlers.WorldProcessing.Dto;

namespace WorldProcessor.Application.Handlers.WorldProcessing.Queries
{
    public record GenerateWorldQuery : IRequest<WorldDto>
    {
        public int Seed { get; set; }

        public int? Epoch { get; set; }

        public IEnumerable<int>? Dimensions { get; set; }

        public WorldConfigDto WorldConfig { get; init; }

        public GenerateWorldQuery(int seed, int? epoch, IEnumerable<int> dimensions, WorldConfigDto config)
        {
            ValidateWorldConfig(config);

            Seed = seed;
            Epoch = epoch ?? 0;
            Dimensions = dimensions ?? new List<int> { 10, 10, 10 };
            WorldConfig = config;
        }

        private void ValidateWorldConfig(WorldConfigDto config)
        {
            foreach (var tileConfig in config.Tiles)
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
            if (config.Neighbors is not null)
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