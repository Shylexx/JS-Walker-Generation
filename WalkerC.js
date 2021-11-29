class Walker{
    constructor(x, y){
    this.xPos = x;
    this.yPos = y;
    this.dir = this.SetRandomDirection();
    }

    getXPos(){
        return this.xPos;
    }
    getYPos(){
        return this.yPos;
    }
    getDir(){
        return this.dir;
    }

    SetRandomDirection(){
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
}