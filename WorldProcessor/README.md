# 🏭 World Iterator
WebApi service that provide functionality to generate and iterate world.

## Usage
WorldProcessor have 2 endpoints:
1) **url:port/WorldProcessing/Generate** - action for generation initial world.
	It accepts only POST request.
	request description:
	```
	{
		"seed": => number,
		"dimensions" => Array<number>?
		"worldConfig": WorldConfig
	}
	```
2) **url:port/WorldProcessing/Iterate** - action for generating next world iteration
it accepts only POST request.
Request body description:
	```
	{
		"world": => World,
		"worldConfig": => WorldConfig
	}
	```


##  Compiled application
Latest compiled application is located in `Release build` directory.
To use it, just run `WorldProcessor.WebApi.exe` executable file and find application address and port in console.
![CLI Preview](./readme-preview-editor.png "CLI Preview")

## Development
For development install .NET SDK - https://dotnet.microsoft.com/en-us/download.
Use IDE that support development on .NET like [Visual Studio](https://visualstudio.microsoft.com/ru/) or [Intellij Rider](https://www.jetbrains.com/ru-ru/rider/).

### Swagger
To use Swagger functionality, get on `url:port/Swagger`.
Swagger is enabled only in **Debug** configuration.
