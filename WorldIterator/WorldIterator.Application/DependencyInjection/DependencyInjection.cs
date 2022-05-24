using Microsoft.Extensions.DependencyInjection;
using MediatR;

using WorldProcessor.Core.Interfaces.Services;
using WorldProcessor.Core.Services;
using WorldProcessor.Application.Handlers.WorldIteration.Queries;
using WorldProcessor.Application.Handlers.WorldIteration.Mapping;

namespace WorldProcessor.Application.DependencyInjection
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddMediatR(typeof(GenerateNextWorldIterationQueryHandler));

            services.AddAutoMapper(typeof(WorldIterationAutoMapperProfile));

            services.AddScoped<IWorldIterationService, WorldIterationService>();
            services.AddTransient<IRandomValueGenerationService, RandomValueGenerationService>();

            return services;
        }
    }
}
