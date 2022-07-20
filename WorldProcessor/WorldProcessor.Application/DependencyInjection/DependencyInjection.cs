using Microsoft.Extensions.DependencyInjection;
using MediatR;

using WorldProcessor.Core.Interfaces.Services;
using WorldProcessor.Core.Services;
using WorldProcessor.Application.Handlers.WorldProcessing.Queries;
using WorldProcessor.Application.Handlers.WorldProcessing.Mapping;

namespace WorldProcessor.Application.DependencyInjection
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddMediatR(typeof(GenerateNextWorldIterationQueryHandler));
            services.AddMediatR(typeof(GenerateWorldQueryHandler));

            services.AddAutoMapper(typeof(WorldIterationAutoMapperProfile));

            return services;
        }
    }
}
