using MediatR;
using AutoMapper;

using WorldProcessor.Core.Entities;
using WorldProcessor.Core.Interfaces;
using WorldProcessor.Core.Interfaces.Services;
using WorldProcessor.Core.Services;
using WorldProcessor.Application.Handlers.WorldProcessing.Dto;

namespace WorldProcessor.Application.Handlers.WorldProcessing.Queries
{
    public class GenerateWorldQueryHandler
        : IRequestHandler<GenerateWorldQuery, WorldDto>
    {
        private readonly IMapper _mapper;

        private readonly IWorldGenerationService _worldGenerationService;

        public GenerateWorldQueryHandler(
            IMapper mapper)
        {
            _mapper = mapper;
            _worldGenerationService = new WorldGenerationService();
        }

        public async Task<WorldDto> Handle(
            GenerateWorldQuery request,
            CancellationToken cancellationToken)
        {
            var worldConfig = _mapper.Map<WorldConfigDto, WorldConfig>(request.WorldConfig);

            var result = new World();

            if(request.Dimensions is null)
            {
                result = _worldGenerationService
                .Generate(
                    request.Seed,
                    worldConfig);
            }
            else
            {
                result = _worldGenerationService
                .Generate(
                    _mapper.Map<IPosition>(request.Dimensions),
                    request.Seed,
                    worldConfig);
            }

            return _mapper.Map<WorldDto>(result);
        }
    }
}
