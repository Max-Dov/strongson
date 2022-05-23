namespace WorldIterator.Core.Entities
{
    public class TileConfig
    {
        public string Id { get; set; }

        public string DisplayName { get; set; }

        public IEnumerable<NeighborConstraint> Neighbors { get; set; }

        public IEnumerable<string> Representation { get; set; }

        public double ChanceToMutate { get; set; }

        public int MutationWeight { get; set; }

        public double MutationMagnitude { get; set; }

        public int MutationMagnitudeRadius { get; set; }
    }
}
