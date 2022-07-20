# 🏭 World Processor
Web Api service that provides functionality to generate and iterate world.

## API

World Processor has 2 endpoints:

### Generate World
Protocol | Url
--- | ---
Https | `POST https://localhost:5001/WorldProcessing/Generate`
Http | `POST http://localhost:5000/WorldProcessing/Generate`

Request body:

```typescript
{
	"seed": => Number,
	"epoch": => Number?,
	"dimensions" => Array<number>?
	"worldConfig": WorldConfig
}
```

### Iterate World
Protocol | Url
--- | ---
Https | `POST https://localohost:5001/WorldProcessing/Iterate`
Http | `POST http://localohost:5000/WorldProcessing/Iterate`

Request body:

```typescript
{
	"world": => World,
	"worldConfig": => WorldConfig
}
```


##  Latest applicaiton build
Application could be found on dropbox.

To use it, just run `WorldProcessor.WebApi.exe` executable file.
By default, application listens 2 ports: 5000 for http and 5001 for https requests.

## Development
For development install .NET SDK - https://dotnet.microsoft.com/en-us/download.
Use IDE that support development on .NET like [Visual Studio](https://visualstudio.microsoft.com/) or [Intellij Rider](https://www.jetbrains.com/rider/).

### Swagger
*Note: Swagger is enabled only in **Debug** configuration*

Swagger functionality is availabile on
Protocol | Url
--- | ---
Https | `https://localohost:5001/Swagger`
Http | `https://localohost:5001/Swagger`