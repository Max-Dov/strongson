using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorldProcessor.Application.Handlers.WorldProcessing.Dto
{
    public class GenerateWorldDto
    {
        public int Seed { get; set; }

        public int? Epoch { get; set; }

        public IEnumerable<int>? Dimensions { get; set; }

        public WorldConfigDto WorldConfig { get; set; }
    }
}
