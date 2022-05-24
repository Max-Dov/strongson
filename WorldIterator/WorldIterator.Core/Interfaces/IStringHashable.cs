namespace WorldProcessor.Core.Interfaces
{
    public interface IStringHashable
    {
        public string GetStringHashCode(string separator = ",");
    }
}