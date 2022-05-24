namespace WorldProcessor.Core.Entities
{
    public class Tile : ICloneable
    {
        public string ConfigId { get; set; }

        public IEnumerable<string> Representation { get; set; }

        public double MutationChance { get; set; }

        public object Clone()
            => new Tile
            {
                ConfigId = ConfigId,
                Representation = Representation,
                MutationChance = MutationChance
            };
    }
}