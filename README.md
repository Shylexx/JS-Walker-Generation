# JS-Walker-Generation
Walker Based Procedural Generation for a Grid (Array of Arrays) intended for use in Phaser 3 with a Tiled Tilesheet/Map. Generation Method based on Vlambeer's Nuclear Throne.



# How to Use:

The ROWS and COLUMNS Properties inside the world object define the size of your grid and will automatically create it.

The FLOORPERCENT property specifies what percentage of the grid to be turned into floor tiles.

Just create a WalkerGen object, passing it an X and a Y coordinate to serve as the origin of the first walker and then run genwWorld, passing the function your world variable.
