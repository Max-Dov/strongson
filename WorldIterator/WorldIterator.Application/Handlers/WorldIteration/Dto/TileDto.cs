namespace WorldIterator.Application.Handlers.WorldIteration.Dto
{
    public class TileDto
    {
        public string Id { get; set; }

        public string[] Representation { get; set; }

        public int[] Coordinates { get; set; }

        public double ChanceToMutate { get; set; }
    }
}
