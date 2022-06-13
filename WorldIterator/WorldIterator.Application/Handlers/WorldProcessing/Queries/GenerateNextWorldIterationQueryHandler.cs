using MediatR;
using AutoMapper;

using WorldProcessor.Core.Entities;
using WorldProcessor.Core.Interfaces.Services;
using WorldProcessor.Core.Services;
using WorldProcessor.Application.Handlers.WorldProcessing.Dto;

namespace WorldProcessor.Application.Handlers.WorldProcessing.Queries
{
    public class GenerateNextWorldIterationQueryHandler 
        : IRequestHandler<GenerateNextWorldIterationQuery, WorldDto>
    {
        private readonly IMapper _mapper;

        private readonly IWorldIterationService _worldIterationService;

        public GenerateNextWorldIterationQueryHandler(
            IMapper mapper)
        {
            _mapper = mapper;
            _worldIterationService = new WorldIterationService();
        }

        public async Task<WorldDto> Handle(
            GenerateNextWorldIterationQuery request,
            CancellationToken cancellationToken)
        {
            var world = _mapper.Map<WorldDto, World>(request.World);
            var worldConfig = _mapper.Map<WorldConfigDto, WorldConfig>(request.WorldConfig);

            var result = await _worldIterationService
                .GenerateNextWorldIterationAsync(
                    world,
                    worldConfig.Tiles,
                    cancellationToken);

            return _mapper.Map<WorldDto>(result);
        }

    }
}
