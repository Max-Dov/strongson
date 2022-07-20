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
            try
            {
                return await _mediator.Send(
                    new GenerateNextWorldIterationQuery(
                        request.World,
                        request.WorldConfig),
                    cancellationToken);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Generate")]
        public async Task<ActionResult<WorldDto>> Generate(
            GenerateWorldDto request,
            CancellationToken cancelToken)
        {
            try
            {
                return await _mediator.Send(
                    new GenerateWorldQuery(
                        request.Seed,
                        request.Epoch,
                        request.Dimensions,
                        request.WorldConfig),
                    cancelToken);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
