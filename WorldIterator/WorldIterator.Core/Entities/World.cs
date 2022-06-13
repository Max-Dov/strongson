using WorldProcessor.Core.Interfaces;

namespace WorldProcessor.Core.Entities
{
    public class World
    {
        public string ConfigId { get; set; }

        public int Seed { get; set; }

        public int Epoch { get; set; }

        public string TileShape { get; set; }

        public IPosition Dimensions { get; set; }

        public Dictionary<IPosition, Tile> Tiles { get; set; }
    }
}