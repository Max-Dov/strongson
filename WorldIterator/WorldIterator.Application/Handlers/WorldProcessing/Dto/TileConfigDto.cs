namespace WorldProcessor.Application.Handlers.WorldProcessing.Dto
{
    public class TileConfigDto
    {
        public string Id { get; set; }

        public NeighborConstraintDto[]? Neighbors { get; set; }

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
