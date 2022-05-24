namespace WorldProcessor.Application.Handlers.WorldIteration.Dto
{
    public class WorldConfigDto
    {
        public string Id { get; set; }

        public TileConfigDto[] Tiles { get; set; }

        public string Geometry { get; set; }
    }
}
