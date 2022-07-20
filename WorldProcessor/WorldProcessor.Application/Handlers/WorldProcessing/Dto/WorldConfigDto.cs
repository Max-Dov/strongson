namespace WorldProcessor.Application.Handlers.WorldProcessing.Dto
{
    public class WorldConfigDto
    {
        public string Id { get; set; }

        public TileConfigDto[] Tiles { get; set; }

        public string TileShape { get; set; }
    }
}
