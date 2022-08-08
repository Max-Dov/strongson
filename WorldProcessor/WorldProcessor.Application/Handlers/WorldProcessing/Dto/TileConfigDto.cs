namespace WorldProcessor.Application.Handlers.WorldProcessing.Dto
{
    public class TileConfigDto
    {
        public string Id { get; set; }

        public string[] RepresentationsIds { get; set; }

        public NeighborConstraintDto[]? Neighbors { get; set; }

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
