using MediatR;

using WorldProcessor.Application.Handlers.WorldProcessing.Dto;

namespace WorldProcessor.Application.Handlers.WorldProcessing.Queries
{
    public record GenerateWorldQuery : IRequest<WorldDto>
    {
        public int Seed { get; set; }

        public IEnumerable<int>? Dimensions { get; set; }

        public WorldConfigDto WorldConfig { get; init; }
    }
}