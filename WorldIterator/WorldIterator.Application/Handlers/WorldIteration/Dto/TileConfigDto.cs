namespace WorldIterator.Application.Handlers.WorldIteration.Dto
{
    public class TileConfigDto
    {
        public string Id { get; set; }

        public string DisplayName { get; set; }

        public NeighborConstraintDto[] Neighbors { get; set; }

        public string[] Representation { get; set; }

        public double ChanceToMutate { get; set; }

        public int MutationWeight { get; set; }

        public double MutationMagnitude { get; set; }

        public int MutationMagnitudeRadius { get; set; }
    }
}
