class WalkerGen {
    walkerX = 12;
    walkerY = 12;
    roomHeight;
    roomWidth;

    //List of Walkers
    walkerList = new Walkers;

    maxWalkers = 10;
    chanceWalkerChangeDir = 0.5;
    chanceWalkerSpawn = 0.05;
    chanceWalkerDestroy = 0.05;
    chanceToFill = 0.2;


    //Grid Directions
    GridLeft = -1;
    GridRight = 1;
    GridUp = -1;
    GridDown = 1;



    //Level Grid
    l1walker_ary;

    constructor(startX, startY){
        this.walkerX = startX;
        this.walkerY = startY;
    }

    //Generate the World with the walkers. Requires a World Config.
    genWorld(world){
        Setup(world);
        CreateFloors();
        CreateWalls();
        //RemoveSingleWalls();

    }

    Setup(world){
        //Get Grid Size
        this.roomHeight = world.ROWS;
        this.roomWidth = world.COLUMNS;
        //Set Grid to World Defined Size
        this.l1walker_ary = world.l1Item_ary.splice(0);
        //Ensure Grid is Entirely Walls to be carved out
        for(let x = 0; x < this.roomWidth-1; x++){
            for( let y = 0; y < this.roomHeight-1; y++){
                this.l1walker_ary[x][y] = 1;
            }
        }

        //Setup First Walker
        //
        let newWalker = new Walker(Math.floor(this.roomHeight/2), Math.floor(this.roomWidth/2));
        this.walkerList.walkers.push(newWalker);
        console.log(this.walkerList.walkers);
    }

    CreateFloors(){
        let iterations = 0;
        //do{
            //create floor at position of walkers
            for (let walkerIndex = 0; walkerIndex < this.walkerList.walkers.length; walkerIndex++){
                this.l1walker_ary[this.walkerList.walkers[walkerIndex].getXPos()][this.walkerList.walkers[walkerIndex].getYPos()] = 0;
            }
            //Check if Destroy
            let numberChecks = this.walkerList.walkers.length;
            for (let destroyIndex = 0; destroyIndex < numberChecks; destroyIndex++){
                //If Walker is not only one, random chance to destroy
                if (this.walkerList.walkers.length > 1 && Math.random() < this.chanceWalkerDestroy){
                    this.walkerList.splice(destroyIndex, 1);
                    break;
                }
                //Random Chance for Walker to Change Direction
                for(let steerIndex = 0; steerIndex < this.walkerList.walkers.length; steerIndex++){
                    if(Math.random() < this.chanceWalkerChangeDir){
                        let thisWalker = this.walkerList.walkers[steerIndex];
                        thisWalker.dir = thisWalker.SetRandomDirection();
                        this.walkerList.walkers[steerIndex] = thisWalker;
                    }
                }
                //Chance Spawn New Walker
                numberChecks = this.walkerList.walkers.length;
                for(let spawnIndex = 0; spawnIndex < this.walkerList.walkers.length; spawnIndex++){
                    //Only if more walkers are allowed and based on chance
                    if(this.walkerList.walkers.length < this.maxWalkers && Math.random() < this.chanceWalkerSpawn){
                        //Create and add walker
                        let createWalker = new Walker(this.walkerList.walkers[spawnIndex].getXPos(), this.walkerList.walkers[spawnIndex].getYPos())
                        this.walkerList.walkers.push(createWalker);
                    }
                }

                //Check Walker Directions Will not hit world border


                //Move Walker

            }

            console.log(this.l1walker_ary);
       // }while(iterations < 100000000);

    }






























    RandomDirection(){
        let direction = Math.floor(Math.random() * 4);
        switch (direction){
            case 0:
                return "left";
            case 1:
                return "up";
            case 2:
                return "right";
            case 3: 
                return "down";
        }
    }




    scanSides(){
        //Scan Surrounding Indexes
        //Scan Left
        if(walkerX > 0){
            if(l1walker_ary[walkerX-1][walkerY] == 1){
                genDir.LEFT = true;
                borderWalls++
            }
        }
        //Scan Top
        if (walkerY > 0){
            if(l1walker_ary[walkerX][walkerY+1] == 1){
                genDir.TOP = true;
                borderWalls++
            }
        }
        //Scan Bottom
        if (walkerY < 9){
            if(l1walker_ary[walkerX][walkerY-1] == 1){
                genDir.BOT = true;
                borderWalls++
            }
        }
        //Scan Right
        if (walkerX > 14){
            if(l1walker_ary[walkerX+1][walkerY] == 1){
                genDir.RIGHT = true;
                borderWalls++
            }
        }
    }

    digTile(){

    }

    makeRoom(){

    }



    /*genWorld(world) {
        //Filled in Array, before walker
    
    
    let walkerX = 7;
    let walkerY = 4;
    l1walker_ary[walkerX][walkerY] = 2;
    let genDir = {
        LEFT: false,
        TOP: false,
        RIGHT: false,
        BOT: false,
    }
    let borderWalls = 0;
    let targetWall = 0;
    console.log("Start Array:");
    console.log(l1walker_ary);
    // Repeat for Map Size
    for(let walkerIdx = 0; walkerIdx < world.FLOORSPACE; walkerIdx++){
    
        
        console.log(walkerIdx);
        console.log("Walker Pos is X:" +walkerX+ " Y: " +walkerY);
        console.log("border walls: " +borderWalls)
        console.log("Available Tiles, Right: " + genDir.RIGHT +" Left: "+ genDir.LEFT +" Top: "+ genDir.TOP +" Bot: "+ genDir.BOT)
    
        //Pick Wall
        targetWall = Math.floor(Math.random() * borderWalls);
    
        //Left Picked
        console.log("targetwall: "+targetWall);
        if (targetWall == 0){
            console.log("Left Picked");
            if (genDir.LEFT == true){
                if (walkerX != 0){
                    l1walker_ary[walkerX][walkerY] = 0;
                walkerX = walkerX - 1;
                l1walker_ary[walkerX][walkerY] = 2;
                console.log("Moved Left to X: " + walkerX);
                }
            }
            else if(genDir.TOP == true){
                if (walkerY != 0){
                    l1walker_ary[walkerX][walkerY] = 0;
                walkerY = walkerY - 1;
                l1walker_ary[walkerX][walkerY] = 2;
                console.log("Moved Up to Y: " +walkerY);
                }
            }
            else if(genDir.RIGHT == true){
                if (walkerX != 14){
                    l1walker_ary[walkerX][walkerY] = 0;
                walkerX = walkerX + 1;
                l1walker_ary[walkerX][walkerY] = 2;
                console.log("Moved Right to X: " + walkerX);
                }
            }
            else if(genDir.BOT == true){
                if (walkerY != 9){
                l1walker_ary[walkerX][walkerY] = 0;
                walkerY = walkerY + 1;
                l1walker_ary[walkerX][walkerY] = 2;
                console.log("Moved Down to Y: " +walkerY);
                }
            }
        }
    
        //Top Picked
        if (targetWall == 1){
            console.log("Top Picked");
            if(genDir.TOP == true){
                if (walkerY != 0){
                    l1walker_ary[walkerX][walkerY] = 0;
                walkerY = walkerY - 1;
                l1walker_ary[walkerX][walkerY] = 2;
                console.log("Moved Up to Y: " +walkerY);
                }
            }
            else if(genDir.RIGHT == true){
                if (walkerX != 14){
                    l1walker_ary[walkerX][walkerY] = 0;
                walkerX = walkerX + 1;
                l1walker_ary[walkerX][walkerY] = 2;
                console.log("Moved Right to X: " + walkerX);
                }
                
            }
            else if(genDir.BOT == true){
                if (walkerY != 9){
                    l1walker_ary[walkerX][walkerY] = 0;
                walkerY = walkerY + 1;
    
                l1walker_ary[walkerX][walkerY] = 2;
                console.log("Moved Down to Y: " +walkerY);
                }
            }
            else if (genDir.LEFT == true){
                if (walkerX != 0){
                    l1walker_ary[walkerX][walkerY] = 0;
                walkerX = walkerX - 1;
                l1walker_ary[walkerX][walkerY] = 2;
                console.log("Moved Left to X: " + walkerX);
                }
            }
        }
    
        //Right Picked
        if (targetWall == 2){
            console.log("Right Picked");
            if(genDir.RIGHT == true){
                if (walkerX != 14){
                    l1walker_ary[walkerX][walkerY] = 0;
                walkerX = walkerX + 1;
                l1walker_ary[walkerX][walkerY] = 2;
                console.log("Moved Right to X: " + walkerX);
                }
            }
            else if(genDir.BOT == true){
                if (walkerY != 9){
                    l1walker_ary[walkerX][walkerY] = 0;
                walkerY = walkerY + 1;
                l1walker_ary[walkerX][walkerY] = 2;
                console.log("Moved Down to Y: " +walkerY);
                }
            }
            else if (genDir.LEFT == true){
                if (walkerX != 0){
                    l1walker_ary[walkerX][walkerY] = 0;
                walkerX = walkerX - 1;
                l1walker_ary[walkerX][walkerY] = 2;
                console.log("Moved Left to X: " + walkerX);
                }
            }
            else if(genDir.TOP == true){
                if (walkerY != 0){
                    l1walker_ary[walkerX][walkerY] = 0;
                walkerY = walkerY - 1;
                l1walker_ary[walkerX][walkerY] = 2;
                console.log("Moved Up to Y: " +walkerY);
                }
            }
        }
    
        //Bot Picked
        if (targetWall == 3){
            console.log("Bot Picked");
            if(genDir.BOT == true){
                if (walkerY != 9){
                    l1walker_ary[walkerX][walkerY] = 0;
                walkerY = walkerY + 1;
                l1walker_ary[walkerX][walkerY] = 2;
                console.log("Moved Down to Y: " +walkerY);
                }
            }
             else if (genDir.LEFT == true){
                if (walkerX != 0){
                    l1walker_ary[walkerX][walkerY] = 0;
                walkerX = walkerX - 1;
                l1walker_ary[walkerX][walkerY] = 2;
                console.log("Moved Left to X: " + walkerX);
                }
            }
            else if(genDir.TOP == true){
                if (walkerY != 0){
                    l1walker_ary[walkerX][walkerY] = 0;
                walkerY = walkerY - 1;
                l1walker_ary[walkerX][walkerY] = 2;
                console.log("Moved Up to Y: " +walkerY);
                }
            }
            else if(genDir.RIGHT == true){
                if (walkerX != 14){
                    l1walker_ary[walkerX][walkerY] = 0;
                    walkerX = walkerX + 1; 
                    l1walker_ary[walkerX][walkerY] = 2;
                console.log("Moved Right to X: " + walkerX);
                }
            }
            
        }
    
    
        borderWalls = 0;
        genDir.RIGHT = false;
        genDir.LEFT = false;
        genDir.TOP = false;
        genDir.BOT = false;
    
        
        console.log(l1walker_ary);
      
    
        
    
    
    
        
    }
    
        
        console.log(world.l1Item_ary);
        world.l1Item_ary = l1walker_ary.splice(0);
    
    
    }*/

}