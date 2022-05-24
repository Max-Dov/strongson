using MediatR;
using AutoMapper;

using WorldProcessor.Core.Entities;
using WorldProcessor.Core.Interfaces.Services;
using WorldProcessor.Application.Handlers.WorldIteration.Dto;

namespace WorldProcessor.Application.Handlers.WorldIteration.Queries
{
    public class GenerateNextWorldIterationQueryHandler 
        : IRequestHandler<GenerateNextWorldIterationQuery, WorldDto>
    {
        private readonly IMapper _mapper;

        private readonly IWorldIterationService _worldIterationService;

        public GenerateNextWorldIterationQueryHandler(
            IMapper mapper,
            IWorldIterationService worldIterationService)
        {
            _mapper = mapper;
            _worldIterationService = worldIterationService;
        }

        public async Task<WorldDto> Handle(
            GenerateNextWorldIterationQuery request,
            CancellationToken cancellationToken)
        {
            var world = _mapper.Map<WorldDto, World>(request.World);

            var tileConfigs = 
                _mapper.Map<TileConfigDto[], IEnumerable<TileConfig>> (request.WorldConfig.Tiles);

            var result = await _worldIterationService
                .GenerateNextWorldIterationAsync(
                    world,
                    tileConfigs,
                    cancellationToken);

            return _mapper.Map<WorldDto>(result);
        }

    }
}
