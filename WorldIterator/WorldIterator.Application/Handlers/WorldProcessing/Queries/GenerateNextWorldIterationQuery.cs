using MediatR;

using WorldProcessor.Application.Handlers.WorldProcessing.Dto;

namespace WorldProcessor.Application.Handlers.WorldProcessing.Queries
{
    public record GenerateNextWorldIterationQuery : IRequest<WorldDto>
    {
        public WorldDto World { get; init; }

        public WorldConfigDto WorldConfig { get; init; }
    }
}