namespace WorldProcessor.Application.Handlers.WorldProcessing.Dto
{
    public class TileDto
    {
        public string ConfigId { get; set; }

        public string Representation { get; set; }

        public int[] Coordinates { get; set; }

        public double ChanceToMutate { get; set; }

        public int BirthEpoch { get; set; }
    }
}
