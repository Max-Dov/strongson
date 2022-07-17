# 🍀 Strongson

Project about world generation and gaming mechanics around it. 
Funny project name comes from combining 2 names together: 
[Stronghold](https://en.wikipedia.org/wiki/Stronghold:_Crusader) computer game
and
[Carcassonne](https://en.wikipedia.org/wiki/Carcassonne_(board_game)) board game.

## World generation
World generation idea comes from [wave function collapse](https://en.wikipedia.org/wiki/Wave_function_collapse) definition.

In simple words, if two-dimensional world consisting of known set of "squares" (forest square, water square, ...) needs to be created, 
given that relation between squares are known (*forest square* can be near *grass plane square*, but not near *water square*),
then world plane can be created in **O(n)** time, where **n** is number of squares in world. That is fast.

## Game
Core game idea is around changing world tiles by players in order to get closer to win condition.
But world is not static, it iterates on itself after players make turns, introducing chaos into game when tiles around are always changing - 
where once there was forest, there is a mountain may appear in a couple of turns.

## Project modules

Look into "readme" files in project modules stored in root directory. Currently, there are 4 things:

* 🧱 Config Editor - stateless webapp, world config editor for world generation algorithm.
* 🏭 World Processor - stateless API service, service that can generate (or iterate) world based on world config (and world for iterations).
* 🦜 Strongson Frontend - stateless webapp, UI of Strongson game based on exact world config.
* 🐢 Strongson Backend - stateful API service, backend of Strongson game based on exact world config.

## License
[MIT](https://mit-license.org/)