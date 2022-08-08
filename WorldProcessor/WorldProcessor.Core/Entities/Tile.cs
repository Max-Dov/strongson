namespace WorldProcessor.Core.Entities
{
    public class Tile : ICloneable
    {
        public string ConfigId { get; set; }

        public string RepresentationId { get; set; }

        public double MutationChance { get; set; }

        public Dictionary<string, double> MutationWeightMultipliers { get; set; }

        public int BirthEpoch { get; set; }

        public object Clone()
            => new Tile
            {
                ConfigId = ConfigId,
                RepresentationId = RepresentationId,
                MutationChance = MutationChance,
                BirthEpoch = BirthEpoch
            };
    }
}