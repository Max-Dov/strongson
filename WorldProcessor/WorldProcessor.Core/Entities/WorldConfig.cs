using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorldProcessor.Core.Entities
{
    public class WorldConfig
    {
        public string Id { get; set; }

        public IEnumerable<TileConfig> Tiles { get; set; }

        public string TileShape { get; set; }
    }
}
