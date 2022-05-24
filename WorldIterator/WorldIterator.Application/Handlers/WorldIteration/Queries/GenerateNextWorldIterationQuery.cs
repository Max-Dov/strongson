using MediatR;

using WorldProcessor.Application.Handlers.WorldIteration.Dto;

namespace WorldProcessor.Application.Handlers.WorldIteration.Queries
{
    public record GenerateNextWorldIterationQuery : IRequest<WorldDto>
    {
        public WorldDto World { get; init; }

        public WorldConfigDto WorldConfig { get; init; }
    }
}