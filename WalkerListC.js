class Walkers {
    constructor(){
        this.walkers = []
    }

    addWalker(x, y){
        let w = new Walker(x, y);
        this.walkers.push(w);
        return w;
    }

    getAllWalkers(){
        return this.walkers;
    }


}