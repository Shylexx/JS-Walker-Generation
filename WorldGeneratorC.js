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

    //Level Grid
    l1walker_ary = [];

    constructor(startX, startY){
        this.walkerX = startX;
        this.walkerY = startY;
    }

    Setup(world){
        //Get Grid Size
        this.roomHeight = world.ROWS;
        this.roomWidth = world.COLUMNS;
        //Set Grid to World Defined Size
       // this.l1walker_ary = world.l1Item_ary.splice(0);



        for(let columnIdx = 0; columnIdx < this.roomWidth; columnIdx++){
            this.l1walker_ary.push([])
            for(let rowIdx = 0; rowIdx < this.roomHeight; rowIdx++){
                this.l1walker_ary[columnIdx].push(1);
            }

        }


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
    }

    CreateFloors(percentToFill){
        let iterations = 0;
        do{
            //create floor at position of walkers
            for (let walkerIndex = 0; walkerIndex < this.walkerList.walkers.length; walkerIndex++){
                this.l1walker_ary[this.walkerList.walkers[walkerIndex].getXPos()][this.walkerList.walkers[walkerIndex].getYPos()] = 0;
            }
            //Check if Destroy
            let numberChecks = this.walkerList.walkers.length;
            for (let destroyIndex = 0; destroyIndex < numberChecks; destroyIndex++){
                //If Walker is not only one, random chance to destroy
                if (this.walkerList.walkers.length > 1 && Math.random() < this.chanceWalkerDestroy){
                    this.walkerList.walkers.splice(destroyIndex, 1);
                    break;
                }
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
            for(let spawnIndex = 0; spawnIndex < numberChecks; spawnIndex++){
                //Only if more walkers are allowed and based on chance
                if(this.walkerList.walkers.length < this.maxWalkers && Math.random() < this.chanceWalkerSpawn){
                    //Create and add walker
                    let createWalker = new Walker(this.walkerList.walkers[spawnIndex].xPos, this.walkerList.walkers[spawnIndex].yPos)
                    this.walkerList.walkers.push(createWalker);
                }
            }

            //Update Walker Positions
            for(let moveIndex = 0; moveIndex < this.walkerList.walkers.length; moveIndex++){
                let thisWalker = this.walkerList.walkers[moveIndex];
                
                if(thisWalker.dir == "left"){
                    thisWalker.xPos = thisWalker.xPos - 1;
                  
                } else if(thisWalker.dir == "up"){
                    thisWalker.yPos = thisWalker.yPos - 1;
               
                }else if(thisWalker.dir == "right"){
                    thisWalker.xPos = thisWalker.xPos + 1;
                
                }else if(thisWalker.dir == "down"){
                    thisWalker.yPos = thisWalker.yPos + 1;
              
                }else {
                    console.log("Invalid Direction");
                }
                this.walkerList.walkers[moveIndex] = thisWalker;
    
            }

            //Clamp Walker Position to Prevent Exiting the World border

            for(let clampIndex = 0; clampIndex < this.walkerList.walkers.length; clampIndex++){
                let thisWalker = this.walkerList.walkers[clampIndex];
                thisWalker.xPos = Math.min(Math.max(thisWalker.xPos, 1), this.roomWidth-2);
                thisWalker.yPos =  Math.min(Math.max(thisWalker.yPos, 1), this.roomHeight-2);
                this.walkerList.walkers[clampIndex] = thisWalker;
            }

            //Check to Exit loop 
            console.log("Current Percentage: " +(this.NumberOfFloors()/ (this.roomHeight * this.roomWidth)))
            if(this.NumberOfFloors() / (this.roomHeight * this.roomWidth) > percentToFill){
                break;
            }
            iterations++;
            console.log(this.NumberOfFloors());

          }while(iterations < 100000);    
          console.log(this.l1walker_ary);
    }

    CreateWalls(){
        for(let rowIdx = 0; rowIdx < this.l1walker_ary.length; rowIdx++){
            for( let colIdx = 0; colIdx < this.l1walker_ary.length; colIdx++){
                if(this.l1walker_ary[rowIdx][colIdx] == 0){
                    if(this.l1walker_ary[rowIdx+1][colIdx] == 1){
                        this.l1walker_ary[rowIdx+1][colIdx] = 2;
                    }
                    if(this.l1walker_ary[rowIdx-1][colIdx] == 1){
                        this.l1walker_ary[rowIdx-1][colIdx] = 2;
                    }
                    if(this.l1walker_ary[rowIdx][colIdx+1] == 1){
                        this.l1walker_ary[rowIdx][colIdx+1] = 2;
                    }
                    if(this.l1walker_ary[rowIdx][colIdx-1] == 1){
                        this.l1walker_ary[rowIdx][colIdx-1] = 2;
                    }
                }
            }
        }
    }

    NumberOfFloors(){
        let floorCount = 0;
        for (let rowIdx = 0; rowIdx < this.l1walker_ary.length; rowIdx++) {
            for (let colIdx = 0; colIdx < this.l1walker_ary.length; colIdx++) {
                if(this.l1walker_ary[rowIdx][colIdx] == 0){
                    floorCount++;
                }
            }
        }
        return floorCount;
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

     //Generate the World with the walkers. Requires a World Config.
     genWorld(world){
        this.Setup(world);
        this.CreateFloors(world.FLOORPERCENT);
        this.CreateWalls();
        //RemoveSingleWalls();

    }
       

} //End of Class
