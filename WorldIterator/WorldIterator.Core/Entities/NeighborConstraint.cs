namespace WorldIterator.Core.Entities
{
    public class NeighborConstraint
    {
        public string Id { get; set; }

        public string NeighborId {  get; set; }

        public int MinAmount { get; set; }

        public int MaxAmount { get; set; }

        public int MinimumDistance { get; set; }

        public int MaximumDistance { get; set; }
    }
}
