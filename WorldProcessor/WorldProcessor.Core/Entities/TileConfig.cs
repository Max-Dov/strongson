namespace WorldProcessor.Core.Entities
{
    public class TileConfig
    {
        public string Id { get; set; }

        public IEnumerable<NeighborConstraint> Neighbors { get; set; }

        public List<string> RepresentationsIds { get; set; }

        public int MutationWeight { get; set; }

        public int MutationChance { get; set; }

        public double CrowdWeightMultiplier { get; set; }

        public int CrowdWeightMultiplierRadius { get; set; }

        public int MinAge { get; set; }

        public int MaxAge { get; set; }

        public double NeighborsMutationMultiplier { get; set; }

        public int NeighborsMutationMultiplierRadius { get; set; }
    }
}
