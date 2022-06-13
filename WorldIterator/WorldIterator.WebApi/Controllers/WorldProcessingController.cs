using Microsoft.AspNetCore.Mvc;
using MediatR;

using WorldProcessor.Application.Handlers.WorldProcessing.Dto;
using WorldProcessor.Application.Handlers.WorldProcessing.Queries;

namespace WorldProcessor.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WorldProcessingController : ControllerBase
    {
        private readonly IMediator _mediator;

        private readonly ILogger _logger;

        public WorldProcessingController(
            IMediator mediator,
            ILogger<WorldProcessingController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        [HttpPost("Iterate")]
        public async Task<ActionResult<WorldDto>> Iterate(
            GenerateNextWorldIterationDto request,
            CancellationToken cancellationToken)
        {
            return await _mediator.Send(
                new GenerateNextWorldIterationQuery()
                {
                    World = request.World,
                    WorldConfig = request.WorldConfig
                },
                cancellationToken);
        }

        [HttpPost("Generate")]
        public async Task<ActionResult<WorldDto>> Generate(
            GenerateWorldDto request,
            CancellationToken cancelToken)
        {
            return await _mediator.Send(
                new GenerateWorldQuery()
                {
                    Seed = request.Seed,
                    Dimensions = request.Dimensions,
                    WorldConfig = request.WorldConfig
                },
                cancelToken);
        }
    }
}
