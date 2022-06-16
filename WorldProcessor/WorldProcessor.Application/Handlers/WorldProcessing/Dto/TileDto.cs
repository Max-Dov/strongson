namespace WorldProcessor.Application.Handlers.WorldProcessing.Dto
{
    public class TileDto
    {
        public string ConfigId { get; set; }

        public string RepresentationId { get; set; }

        public int[] Coordinates { get; set; }

        public double MutationChance { get; set; }

        public int BirthEpoch { get; set; }
    }
}
