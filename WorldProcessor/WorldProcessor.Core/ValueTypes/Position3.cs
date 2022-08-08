using WorldProcessor.Core.Interfaces;
using WorldProcessor.Core.Enums;
using WorldProcessor.Core.Exceptions;

namespace WorldProcessor.Core.ValueTypes
{
    public struct Position3 : IPosition
    {
        public int X { get; set; }

        public int Y { get; set; }

        public int Z { get; set; }

        public Position3()
        {
            X = 0;
            Y = 0;
            Z = 0;
        }

        public Position3(int x, int y, int z)
        {
            X = x;
            Y = y;
            Z = z;
        }

        public bool Equals(IPosition? other)
            => other is not null
            && other is Position3
            && Equals((Position3)other);

        private bool Equals(Position3 other)
            => other.X == X
            && other.Y == Y
            && other.Z == Z;

        public override int GetHashCode()
            => HashCode.Combine(X, Y, Z);

        public string GetStringHashCode(string separator = ",")
            => $"{X}{separator}{Y}{separator}{Z}";

        public IPosition GetNeighbourPositionByDirection(int directionNumber)
        {
            if (Enum.TryParse<HexagonalDirection>(directionNumber.ToString(), out var direction))
            {
                switch (direction)
                {
                    case HexagonalDirection.ZPlus: return NormalizePosition(X, Y, Z + 1);
                    case HexagonalDirection.XMinus: return NormalizePosition(X - 1, Y, Z);
                    case HexagonalDirection.YPlus: return NormalizePosition(X, Y + 1, Z);
                    case HexagonalDirection.ZMinus: return NormalizePosition(X, Y, Z - 1);
                    case HexagonalDirection.XPlus: return NormalizePosition(X + 1, Y, Z);
                    case HexagonalDirection.YMinus: return NormalizePosition(X, Y - 1, Z);
                    default: return new Position3(X, Y, Z); // impossible, but necessary
                }
            }
            else
            {
                throw new InvalidHexagonalDirectionException(directionNumber);
            }
        }

        private Position3 NormalizePosition(Position3 position)
        {
            var minimalCoodinateValue = new int[] {position.X, position.Y, position.Z}.Min();
            return new Position3(
                position.X - minimalCoodinateValue,
                position.Y - minimalCoodinateValue,
                position.Z - minimalCoodinateValue
                );
        }

        private Position3 NormalizePosition(int x, int y, int z) {
            var minimalCoodinateValue = new int[] { x, y, z }.Min();
            return new Position3(
                x - minimalCoodinateValue,
                y - minimalCoodinateValue,
                z - minimalCoodinateValue
                );
        }

        private Position3 Add(Position3 position)
            => NormalizePosition(X + position.X, Y + position.Y, Z + position.Z);
        private Position3 Subtract(Position3 position)
            => NormalizePosition(X - position.X, Y - position.Y, Z - position.Z);
        private Position3 Multiply(Position3 position)
            => NormalizePosition(X * position.X, Y * position.Y, Z * position.Z);

        public IPosition Add(IPosition position)
            => Add((Position3)position);

        public IPosition Subtract(IPosition position)
            => Subtract((Position3)position);

        public IPosition Multiply(IPosition position)
            => Multiply((Position3)position);

        public IPosition GetZeroPosition()
            => new Position3(0, 0, 0);

        public int GetMinimalCoordinate()
            => new int[] { X, Y, Z }.Min();

        public int GetMaximalCoordinate()
            => new int[] { X, Y, Z }.Max();

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

            var position = center.Add(new Position3(radius, 0, 0));
            for (int i = 1; i <= 6; i++)
            {
                for (int j = 0; j < radius; j++)
                {
                    result.Add(position);
                    position = position.GetNeighbourPositionByDirection(i);
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
            => new List<int>() { X, Y, Z };

        public List<IPosition> GenerateInitialField(IPosition dimensions)
        {
            var dimensions3 = (Position3)dimensions;

            var initialField = new List<IPosition>()
            {
                new Position3(0, 0, 0)
            };

            for(var z = 1; z < dimensions3.Z; z++)
            {
                initialField.Add(new Position3(0, 0, z));
                for(var x = 1; x < dimensions3.X; x++)
                {
                    initialField.Add(new Position3(x, 0, z));
                }
            }

            for(var x = 1; x < dimensions3.X; x++)
            {
                initialField.Add(new Position3(x, 0, 0));
                for(var y = 1; y < dimensions3.Y; y++)
                {
                    initialField.Add(new Position3(x, y, 0));
                }
            }

            for(var y = 1; y < dimensions3.Y; y++)
            {
                initialField.Add(new Position3(0, y, 0));
                for(var z = 1; z < dimensions3.Z; z++)
                {
                    initialField.Add(new Position3(0, y, z));
                }
            }

            return initialField;
        }
    }
}