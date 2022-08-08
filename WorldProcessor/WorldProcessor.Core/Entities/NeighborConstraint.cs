namespace WorldProcessor.Core.Entities
{
    public class NeighborConstraint
    {
        public string ConfigId { get; set; }

        public string NeighborConfigId { get; set; }

        public int? MinAmount { get; set; }

        public int? MaxAmount { get; set; }

        public int? MinDistance { get; set; }

        public int? MaxDistance { get; set; }
    }
}
