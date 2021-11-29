# JS-Walker-Generation
Walker Based Procedural Generation for a Grid (Array of Arrays) intended for use in Phaser 3 with a Tiled Tilesheet/Map. Generation Method based on Vlambeer's Nuclear Throne.



# How to Use:

Currently the grid must be set out as a template in the World File inside main.js as well as the amount of rows and columns to be used in the generation. (I plan to improve this to make it easier)

The FLOORPERCENT property specifies what percentage of the grid to be turned into floor tiles.

Just create a WalkerGen object, passing it an X and a Y coordinate to serve as the origin of the first walker and then run genwWorld, passing the function your world variable.
