namespace WorldProcessor.Core.Interfaces
{
    public interface IPosition : IEquatable<IPosition>, IStringHashable
    {
        public IPosition Add(IPosition position);

        public IPosition Subtract(IPosition position);

        public IPosition Multiply(IPosition position);

        public IPosition GetZeroPosition();

        public int GetMinimalCoordinate();

        public int GetMaximalCoordinate();

        public IPosition GetNeighbourPositionByDirection(int direction);

        public IEnumerable<IPosition> GenerateOrderedRingPath(IPosition center, int radius);

        public IEnumerable<IPosition> GenerateOrderedSpiralPath(IPosition center, int radius);

        public IEnumerable<int> GetCoordinatesList();

        public List<IPosition> GenerateInitialField(IPosition dimensions);
    }
}