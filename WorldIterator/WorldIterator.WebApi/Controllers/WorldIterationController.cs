using Microsoft.AspNetCore.Mvc;
using MediatR;

using WorldIterator.Application.Handlers.WorldIteration.Dto;
using WorldIterator.Application.Handlers.WorldIteration.Queries;

namespace WorldIterator.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WorldIterationController : ControllerBase
    {
        private readonly IMediator _mediator;

        private readonly ILogger _logger;

        public WorldIterationController(
            IMediator mediator,
            ILogger<WorldIterationController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult<WorldDto>> Post(
            [FromBody] GenerateNextWorldIterationDto request,
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
    }
}
