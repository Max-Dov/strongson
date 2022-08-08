namespace WorldProcessor.Application.Handlers.WorldProcessing.Dto
{
    public class NeighborConstraintDto
    {
        public string ConfigId { get; set; }

        public string NeighborConfigId { get; set; }

        public int? MinAmount { get; set; }

        public int? MaxAmount { get; set; }

        public int? MinDistance { get; set; }

        public int? MaxDistance { get; set; }
    }
}
