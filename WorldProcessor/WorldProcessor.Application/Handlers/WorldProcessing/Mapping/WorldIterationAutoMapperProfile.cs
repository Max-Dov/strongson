using AutoMapper;

using WorldProcessor.Core.Entities;
using WorldProcessor.Core.Interfaces;
using WorldProcessor.Core.ValueTypes;
using WorldProcessor.Application.Handlers.WorldProcessing.Dto;

namespace WorldProcessor.Application.Handlers.WorldProcessing.Mapping
{
    public class WorldIterationAutoMapperProfile : Profile
    {
        public WorldIterationAutoMapperProfile()
        {
            CreateMap<IEnumerable<int>, IPosition>()
                .ConvertUsing<IEnumerable2IPositionConverter>();

            CreateMap<IPosition, IEnumerable<int>>()
                .ConvertUsing<Position2IEnumerableConverter>();

            CreateMap<TileConfigDto, TileConfig>()
                .ForMember(
                    tileConfig => tileConfig.Neighbors,
                    options => options.NullSubstitute(new NeighborConstraintDto[0]));

            CreateMap<WorldConfigDto, WorldConfig>()
                .ConvertUsing<WorldConfigDto2WorldConfigConverter>();

            CreateMap<NeighborConstraintDto, NeighborConstraint>();

            CreateMap<TileDto, Tile>();

            CreateMap<WorldDto, World>()
                .ConvertUsing<WorldDto2WorldConverter>();

            CreateMap<World, WorldDto>()
                .ConvertUsing<World2WorldDtoConverter>();
        }
    }

    public class IEnumerable2IPositionConverter
        : ITypeConverter<IEnumerable<int>, IPosition>
    {
        public IPosition Convert(
            IEnumerable<int> source,
            IPosition destination,
            ResolutionContext context)
        {
            switch (source.Count())
            {
                case 2:
                    {
                        return new Position2(
                            source.ElementAt(0),
                            source.ElementAt(1)
                        );
                    }
                case 3:
                    {
                        return new Position3(
                            source.ElementAt(0),
                            source.ElementAt(1),
                            source.ElementAt(2)
                        );
                    }
                default:
                    {
                        throw new Exception(
                            "Undefined type of world dimensions - " +
                            $"({string.Join(", ", source)})");
                    }
            }
        }
    }

    public class Position2IEnumerableConverter
        : ITypeConverter<IPosition, IEnumerable<int>>
    {
        public IEnumerable<int> Convert(
            IPosition source,
            IEnumerable<int> destination,
            ResolutionContext context)
            => source.GetCoordinatesList();
    }

    public class WorldConfigDto2WorldConfigConverter
        : ITypeConverter<WorldConfigDto, WorldConfig>
    {
        public WorldConfig Convert(WorldConfigDto source, WorldConfig destination, ResolutionContext context)
        {
            return new WorldConfig()
            {
                Id = source.Id,
                TileShape = source.TileShape,
                Tiles = source.Tiles
                    .Select(dto => context.Mapper.Map<TileConfigDto, TileConfig>(dto))
                    .ToList()
            };
        }
    }

    public class WorldDto2WorldConverter
        : ITypeConverter<WorldDto, World>
    {
        public World Convert(
            WorldDto source,
            World destination,
            ResolutionContext context)
        {
            var result = new World()
            {
                ConfigId = source.ConfigId,
                Seed = source.Seed,
                Epoch = source.Epoch,
                TileShape = source.TileShape
            };

            result.Dimensions = context.Mapper
                .Map<IEnumerable<int>, IPosition>(source.Dimensions);

            result.Tiles = new Dictionary<IPosition, Tile>();

            foreach(var kvp in source.Tiles)
            {
                IPosition tilePosition = context.Mapper
                    .Map<IEnumerable<int>, IPosition>(
                        kvp.Key
                            .Split(",")
                            .Select(str => int.Parse(str)));

                if(tilePosition.GetType() != result.Dimensions.GetType())
                {
                    throw new Exception(
                        "Tile position type is not equal to world dimensions type - " +
                        $"({kvp.Key})");
                }

                var tile = context.Mapper.Map<TileDto, Tile>(kvp.Value);

                result.Tiles.Add(tilePosition, tile);
            }

            return result;
        }
    }

    public class World2WorldDtoConverter
        : ITypeConverter<World, WorldDto>
    {
        public WorldDto Convert(World source, WorldDto destination, ResolutionContext context)
            => new WorldDto
            {
                ConfigId = source.ConfigId,
                Seed = source.Seed,
                Epoch = source.Epoch,
                TileShape = source.TileShape,
                Dimensions = context.Mapper.Map<IPosition, IEnumerable<int>>(source.Dimensions).ToArray(),
                Tiles = source.Tiles
                    .ToDictionary(
                    kvp => kvp.Key.GetStringHashCode(),
                    kvp => new TileDto()
                    {
                        ConfigId = kvp.Value.ConfigId,
                        RepresentationId = kvp.Value.RepresentationId,
                        MutationChance = kvp.Value.MutationChance,
                        Coordinates = kvp.Key.GetCoordinatesList().ToArray()
                    })
            };
    }
}
