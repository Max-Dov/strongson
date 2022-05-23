using MediatR;

using WorldIterator.Application.Handlers.WorldIteration.Dto;

namespace WorldIterator.Application.Handlers.WorldIteration.Queries
{
    public record GenerateNextWorldIterationQuery : IRequest<WorldDto>
    {
        public WorldDto World { get; init; }

        public WorldConfigDto WorldConfig { get; init; }
    }
}