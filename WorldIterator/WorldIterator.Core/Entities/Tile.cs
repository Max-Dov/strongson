namespace WorldProcessor.Core.Entities
{
    public class Tile : ICloneable
    {
        public string ConfigId { get; set; }

        public string Representation { get; set; }

        public int MutationChance { get; set; }

        public int BirthEpoch { get; set; }

        public object Clone()
            => new Tile
            {
                ConfigId = ConfigId,
                Representation = Representation,
                MutationChance = MutationChance,
                BirthEpoch = BirthEpoch
            };
    }
}