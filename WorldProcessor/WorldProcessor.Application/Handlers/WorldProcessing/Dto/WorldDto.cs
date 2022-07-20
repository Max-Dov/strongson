namespace WorldProcessor.Application.Handlers.WorldProcessing.Dto
{
    public class WorldDto
    {
        public string ConfigId { get; set; }

        public int Seed { get; set; }

        public int Epoch { get; set; }

        public string TileShape { get; set; }

        public int[] Dimensions { get; set; }

        public Dictionary<string, TileDto> Tiles { get; set; }
    }
}
