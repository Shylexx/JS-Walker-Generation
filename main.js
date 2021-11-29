let world = {
    ROWS: 50,
    COLUMNS: 50,
    TILEWIDTH: 32,
    FLOORPERCENT: 0.3,

}; // end of world

//Random Start Location
//var WorldGenerator = new WalkerGen(Math.floor(Math.random() * (28 - 2 + 1) + 2), Math.floor(Math.random() * (28 - 2 + 1) + 2));

//Centre Start Location
var WorldGenerator = new WalkerGen(15,15);

WorldGenerator.genWorld(world);
