using Microsoft.Extensions.DependencyInjection;
using MediatR;

using WorldIterator.Core.Interfaces.Services;
using WorldIterator.Core.Services;
using WorldIterator.Application.Handlers.WorldIteration.Queries;
using WorldIterator.Application.Handlers.WorldIteration.Mapping;

namespace WorldIterator.Application.DependencyInjection
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
