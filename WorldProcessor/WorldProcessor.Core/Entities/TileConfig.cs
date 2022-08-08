namespace WorldProcessor.Core.Entities
{
    public class TileConfig
    {
        public string Id { get; set; }

        public List<string> RepresentationsIds { get; set; }

        public List<NeighborConstraint> Neighbors { get; set; }

        public double MutationChance { get; set; }

        public double? MutationChanceMultiplier { get; set; }

        public int? MutationChanceMultiplierRadius { get; set; }

        public double MutationWeight { get; set; }

        public double? MutationWeightMultiplier { get; set; }

        public int? MutationWeightMultiplierRadius { get; set; }

        public int? MinAge { get; set; }

        public int? MaxAge { get; set; }
    }
}
