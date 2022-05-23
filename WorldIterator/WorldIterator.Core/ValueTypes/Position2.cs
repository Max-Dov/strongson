using WorldIterator.Core.Interfaces;
using WorldIterator.Core.Enums;
using WorldIterator.Core.Exceptions;

namespace WorldIterator.Core.ValueTypes
{
    public struct Position2 : IPosition
    {
        public int X
        {
            get => default;
            set
            {
            }
        }

        public int Y
        {
            get => default;
            set
            {
            }
        }

        public Position2()
        { }

        public Position2(int x, int y)
        {
            X = x;
            Y = y;
        }

        public bool Equals(IPosition? other)
            => other is not null
            && other is Position2
            && Equals((Position2)other);

        private bool Equals(Position2 other)
            => other.X == this.X 
            && other.Y == this.Y;

        public override int GetHashCode()
            => HashCode.Combine(X, Y);

        public string GetStringHashCode(string separator = ",")
            => $"{X}{separator}{Y}";

        public IPosition GetNeighbourPositionByDirection(int directionNumber)
        {
            if(Enum.TryParse<TetragonalDirection>(directionNumber.ToString(), out var direction))
            {
                switch (direction)
                {
                    case TetragonalDirection.North: return new Position2(X, Y + 1);
                    case TetragonalDirection.NorthEast: return new Position2(X + 1, Y + 1);
                    case TetragonalDirection.East: return new Position2(X + 1, Y);
                    case TetragonalDirection.SouthEast: return new Position2(X + 1, Y - 1);
                    case TetragonalDirection.South: return new Position2(X, Y - 1);
                    case TetragonalDirection.SouthWest: return new Position2(X - 1, Y - 1);
                    case TetragonalDirection.West: return new Position2(X - 1, Y);
                    case TetragonalDirection.NorthWest: return new Position2(X - 1, Y + 1);
                    default: return new Position2(X, Y); // impossible, but necessary
                }
            }
            else
            {
                throw new InvalidTetragonalDirectionException(directionNumber);
            }
        }

        private Position2 Add(Position2 other)
            => new Position2(X + other.X, Y + other.Y);
        private Position2 Subtract(Position2 other)
            => new Position2(X - other.X, Y - other.Y);
        private Position2 Multiply(Position2 other)
            => new Position2(X * other.X, Y * other.Y);

        public IPosition Add(IPosition position)
            => Add((Position2)position);

        public IPosition Subtract(IPosition position)
            => Subtract((Position2)position);

        public IPosition Multiply(IPosition position)
            => Multiply((Position2)position);

        public IPosition GetZeroPosition()
            => new Position2(0, 0);

        public int GetMinimalCoordinate()
            => new int[] { X, Y }.Min();

        public int GetMaximalCoordinate()
            => new int[] { X, Y }.Max();

        public IEnumerable<IPosition> GenerateOrderedRingPath(IPosition center, int radius)
        {
            if (radius < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(radius));
            }

            if (radius == 0)
            {
                return new List<IPosition>
                {
                    center
                };
            }

            var result = new List<IPosition>();

            var position = center.Add(new Position2(-radius, -radius));

            for (int i = 1; i <= 4; i++)
            {
                for (int j = 0; j < radius * 2; j++)
                {
                    result.Add(position);
                    position = position.GetNeighbourPositionByDirection(i*2);
                }
            }

            return result;
        }

        public IEnumerable<IPosition> GenerateOrderedSpiralPath(IPosition center, int radius)
        {
            if (radius < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(radius));
            }

            var result = new List<IPosition>();

            for (int i = 0; i < radius; i++)
            {
                result.AddRange(GenerateOrderedRingPath(center, i));
            }

            return result;
        }

        public IEnumerable<int> GetCoordinatesList()
            => new List<int>() { X, Y };
    }
}